import { Beat } from './elements'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import schema from 'bach-json-schema'
import Ajv from 'ajv'
import fs from 'fs'

const ajv = new Ajv()

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'))

export const validate = ajv.compile(schema)

/**
 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
 */
export class Track {

  /**
   * @param {Object} source track represented in Bach.JSON
   * @param {Audio} [audio] track audio
   * @param {boolean} [loop] enable track looping
   * @param {number} [delay] wait a duration before starting to play
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [on] event hooks
   */
  constructor ({ source, audio, loop, volume, tempo, delay, timer, on }) {
    if (!validate(source)) {
      throw TypeError(`Invalid Bach.JSON source data: ${JSON.stringify(validate.errors)}`)
    }

    this.source = source
    this.audio  = audio
    this.loop   = loop
    this.volume = volume
    this.tempo  = tempo
    this.delay  = delay
    this.timer  = timer
    this.on     = on || { step: { } }

    this.index = { measure: 0, beat: 0 }
    this.music = new Howl({ src: audio, loop })

    // this.listen()
  }

  /**
   * Parses and returns the source track data as Beat elements
   *
   * @returns {Array<Object>}
   */
  get data () {
    return this.source.data.map(Beat.from)
  }

  /**
   * Provides the source header data of the track
   *
   * @returns {Object}
   */
  get headers () {
    return this.source.headers
  }

  /**
   * Provides the measure and beat found at the track's cursor
   *
   * @returns {Object}
   */
  get state () {
    return this.at(this.cursor.measure, this.cursor.beat)
  }

  /**
   * Provides the measure and beat found one step behind the track's cursor
   *
   * @returns {Object}
   */
  get last () {
    return this.at(this.cursor.measure - 1, this.cursor.beat - 1)
  }

  /**
   * Provides the measure and beat found one step ahead of the track's cursor
   *
   * @returns {Object}
   */
  get next () {
    return this.at(this.cursor.measure + 1, this.cursor.beat + 1)
  }

  /**
   * Determines the cursors of both the current measure and beat of the track
   *
   * @returns {Object}
   */
  get cursor () {
    return {
      measure : Math.min(Math.max(this.index.measure, 0), this.data.length),
      beat    : Math.min(Math.max(this.index.beat,    0), this.data[0].length)
    }
  }

  /**
   * Determines how long to wait between each interval based on the track and user tempo
   *
   * @returns {number}
   */
  get interval () {
    const header = this.headers.tempo
    const tempos = {
      init: header,
      user: this.tempo || header
    }

    const diff = tempos.user / tempos.init

    return this.headers['ms-per-beat'] / diff
  }

  /**
   * Determines the measure and beat found at the provided indices
   *
   * @param {number} measureIndex
   * @param {number} beatIndex
   * @returns {Object}
   */
  at (measureIndex, beatIndex) {
    try {
      const measure = this.data[measureIndex]
      const beat = measure[beatIndex]

      return { measure, beat }
    } catch (e) {
      return null
    }
  }

  /**
   * Synchronizes track with the Howler API
   */
  listen () {
    this.music.on('play',  this.play)
    this.music.on('pause', this.pause)
    this.music.on('stop',  this.stop)
    this.music.on('rate',  this.rate)
    this.music.on('seek',  this.seek)
  }

  /**
   * Emits an event to a topic
   *
   * @param {string} topic calls an event (by key) defined in `this.on`
   * @param {*} data
   */
  // TODO: integrate core Howler event handler
  // load, loaderror, play, end, pause, stop, mute, volume, rate, seek, fade
  emit (topic, data) {
    const action = this.on instanceof Object && this.on[topic]

    if (action instanceof Function) {
      action(data)
    }
  }

  /**
   * Initializes a new stateful dynamic interval, the primary synchronization mechanism
   */
  start () {
    const delay  = this.delay * this.interval
    const config = { wait: this.interval, defer: false }

    setTimeout(() => {
      this.clock = setStatefulDynterval(this.step.bind(this), config, this.timer)
    }, delay || 0)
  }

  /**
   * Loads the audio data and kicks off the synchronization clock
   */
  // FIXME: sync audio playback with `start` delay
  play () {
    this.music.once('load', () => {
      if (!this.clock) this.start()

      this.music.play()
      this.emit('play')
    })
  }

  /**
   * Stops the audio and the synchronization clock (no resume)
   */
  stop () {
    this.music.stop()
    this.clock.clear()
  }

  /**
   * Pauses the audio and the synchronization clock
   */
  pause () {
    this.music.pause()
    this.clock.pause()
  }

  /**
   * Resumes the audio and the synchronization clock
   */
  resume () {
    this.music.play()
    this.clock.resume()
  }

  /**
   * Mutes the track audio
   */
  mute () {
    this.music.mute()
  }

  /**
   * Seek to a new position in the track
   *
   * @param {number} to position in the track in seconds
   */
  // WARN: probably can't even support this because of dynamic interval (step can change arbitrarily)
  // NOTE: if we assume every interval is the same, relative to tempo, this could work
  seek (to) {
    this.music.seek(to)
  }

  /**
   * Invokes the action to perform on each interval
   *
   * @param {Object} [context] stateful dynamic interval context
   * @returns {Object} updated interval context
   */
  // TODO: support `bach.Set` (i.e. concurrent elements)
  step (context) {
    const { last, interval } = this
    const { beat } = this.state
    const { play, start, stop } = this.on.step
    const wait = interval * beat.duration

    if (stop instanceof Function && last) {
      stop(last)
    }

    if (start instanceof Function) {
      start(beat)
    }

    if (beat.exists && play instanceof Function) {
      play(beat)
    }

    this.bump()

    return Object.assign(context || {}, { wait })
  }

  /**
   * Increases the cursor to the next measure and beat of the track
   */
  bump () {
    const limit = {
      measure : Math.max(this.data.length,    1),
      beat    : Math.max(this.data[0].length, 1)
    }

    this.index.measure = (this.index.measure + 1) % limit.measure
    this.index.beat    = (this.index.beat    + 1) % limit.beat
  }

  /**
   * Reads and parses Bach.JSON data from the file system
   *
   * @param {string} path
   */
  static read (path) {
    return new Track({ source: fs.readFileSync(path) })
  }

}
