import { Beat } from './elements'
import { validate } from './validate'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import EventEmitter from 'events'

/**
 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
 */
export class Track extends EventEmitter {

  /**
   * @param {Object} source track represented in Bach.JSON
   * @param {Audio} [audio] track audio
   * @param {boolean} [loop] enable track looping
   * @param {number} [delay] wait a duration before starting to play
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [on] event hooks
   */
  constructor ({ source, audio, loop, volume, tempo, delay, timer, howler }) {
    super()

    if (!validate(source)) {
      throw TypeError(`Invalid Bach.JSON source data: ${JSON.stringify(validate.errors)}`)
    }

    this.source = source
    this.audio  = audio
    this.loop   = loop
    this.volume = volume
    this.tempo  = tempo
    this.delay  = delay
    this.timer  = timer || defaultTimer

    this.index = { measure: 0, beat: 0 }
    this.music = new Howl(Object.assign({
      src: audio,
      loop
    }), howler)

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
   * Instantiates a new clock which acts as the primary synchronization mechanism
   */
  // FIXME: This needs to return a Promise, that way `play` only gets called after the timer has been invoked
  start () {
    const delay  = this.delay * this.interval

    setTimeout(() => {
      this.clock = this.timer(this)
      this.emit('start')
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
    if (!this.clock) return

    this.music.stop()
    this.clock.stop()
    this.emit('stop')
  }

  /**
   * Pauses the audio and the synchronization clock
   */
  pause () {
    this.music.pause()
    this.clock.pause()
    this.emit('pause')
  }

  /**
   * Resumes the audio and the synchronization clock
   */
  resume () {
    this.music.play()
    this.clock.resume()
    this.emit('resume')
  }

  /**
   * Mutes the track audio
   */
  mute () {
    this.music.mute()
    this.emit('mute')
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
    this.emit('seek')
  }

  /**
   * Invokes the action to perform on each interval
   *
   * @param {Object} [context] stateful dynamic interval context
   * @returns {Object} updated interval context
   */
  // TODO: support `bach.Set` (i.e. concurrent elements)
  step (context) {
    console.log('\n[gig:step]')

    const { last, interval, state } = this
    const { beat } = state
    const { duration, exists } = beat
    const wait = interval * duration

    if (last)   this.emit('beat:stop', last)
    if (exists) this.emit('beat:play', beat)

    this.bump()

    console.log('[gig:step] beat duration', beat.duration)
    console.log('[gig:step] interval, next wait', interval, wait)

    return Object.assign(context || {}, { wait })
  }

  /**
   * Increases the cursor to the next beat of the track and, if we're on the last beat,
   * also increases the cursor to the next measure.
   */
  bump () {
    const numOf = {
      measures : this.data.length,
      beats    : this.data[0].length
    }

    const limit = {
      measure : Math.max(numOf.measures, 1),
      beat    : Math.max(numOf.beats,    1)
    }

    const increment = {
      measure : this.index.beat === (limit.beat - 1) ? 1 : 0,
      beat    : 1
    }

    this.index.measure = (this.index.measure + increment.measure) % limit.measure
    this.index.beat    = (this.index.beat    + increment.beat)    % limit.beat
  }

  /**
   * Determines if the track's music is loading
   */
  loading () {
    return this.music.state() === 'loading'
  }

}

export const defaultTimer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true }).run()
