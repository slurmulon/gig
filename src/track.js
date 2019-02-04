import { Beat } from './elements'
import { validate } from './validate'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
// import { QuartzPoll } from 'quartz'
import fs from 'fs'


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
    // WARN: Being refactored to act as a factory for generating the clock
    // TODO: Ensure resulting object adheres to interface, containing essential methods for control
    this.timer = timer || defaultTimer
    this.on = on || { step: { } }

    this.index = { measure: 0, beat: 0 }
    this.music = new Howl({
      // src: this.resolve(audio || this.headers.audio),
      src: audio,
      loop
    })

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
  // TODO: Use EventEmitter instead
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

    console.log('[gig:delay] delay', delay)
    console.log('[gig:interval] interval', config.wait)

    setTimeout(() => {
      // this.clock = setStatefulDynterval(this.step.bind(this), config, this.timer)

      // FIXME: restart this clock from the beginning when the track loops again, based on `onend` Howler event (should almost completely eliminate drift regardless of where it's stemming from)
      // TODO: allow users to provide their own clock factory, that way they aren't boxed into using QuartzPoll
      // TODO: make Quartz support the `setInterval` and `clearInterval` API, then just
      // pass it as a timer into `setStatefulDynterval` (avoids the need to mess with the `target` calculation
      // this.clock = new QuartzPoll({
      //   action: this.step.bind(this),
      //   every: config.wait,
      //   defer: config.defer
      // }).play()

      this.clock = this.timer(this)

      // TODO: accept QuartzPoll from jelli instead (make it generic)
      // FIXME: this is off by the initial delay, strangely enough
      // FIXME: this re-introduces the drift... sigh. it's because we have to re-create the interval each time. need to persist the state even with `setTimeout`
      //  - could also just allow `stateful-dynamic-interval` (or even `dynamic-interval` to have a non-dynamic/static mode (this way it doesn't need to clear the timeout/interval on each step)
      // this.clock = setStatefulDynterval(this.step.bind(this), config, QuartzPoll.asInterval)
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
    console.log('\n[gig:step]')

    const { last, interval } = this
    const { beat } = this.state
    const { play, start, stop } = this.on.step
    const wait = interval * beat.duration
    // const wait = interval * (beat.duration || 1) // NOTE: makes no difference

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

  /**
   * Normalizes the audio data into a single point of access.
   *
   * Prepends `host` value onto any audio URLs.
   */
  // TODO: Remove - Howler does this already
  // resolve (audio = this.audio) {
  //   const remote = url => this.host + url

  //   if (audio) {
  //     if (audio instanceof Array) {
  //       return audio.map(remote)
  //     } else if (audio && audio.constructor === String) {
  //       return remote(audio)
  //     }
  //   }

  //   return audio
  // }

  /**
   * Reads and parses Bach.JSON data from the file system
   *
   * @param {string} path
   */
  static read (path) {
    return new Track({ source: fs.readFileSync(path) })
  }

}

const defaultTimer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, defer: false })
