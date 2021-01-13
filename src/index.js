import { Track } from 'bach-js'
import { Howl, Howler } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import EventEmitter from 'events'

/**
 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
 */
export class Gig extends Track {

  /**
   * @param {Object} source track represented in Bach.JSON
   * @param {Audio} [audio] track audio
   * @param {boolean} [loop] enable track looping
   * @param {boolean} [tempo] in beats per minute
   * @param {number} [delay] wait a duration before starting to play
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [howler] optional Howler configuration overrides
   */
  constructor ({ source, audio, loop, tempo, delay, timer, howler }) {
    super(source)

    EventEmitter.call(this)

    this.audio  = audio
    this.loop   = loop
    this.tempo  = tempo // FIXME: Sync with Howler's rate property
    this.delay  = delay
    this.timer  = timer || defaultTimer

    this.index = { measure: 0, beat: 0, step: 0 }
    // this.index = { measure: 0, beat: 0, step: 0, tick: 0 }
    this.music = new Howl(Object.assign({
      src: audio,
      loop
    }, howler))

    // this.listen()
  }

  get ctx () {
    return Howler.ctx
  }

  /**
   * Provides the measure and beat found at the track's cursor
   *
   * @returns {Object}
   */
  get state () {
    return this.at(this.current.measure, this.current.beat)
  }

  /**
   * Provides the measure and beat found one step behind the track's cursor
   *
   * @returns {Object}
   */
  get last () {
    return this.at(this.current.measure - 1, this.current.beat - 1)
  }

  /**
   * Provides the measure and beat found one step ahead of the track's cursor
   *
   * @returns {Object}
   */
  get next () {
    return this.at(this.current.measure + 1, this.current.beat + 1)
  }

  /**
   * Determines the number of beats in a measure
   *
   * @returns {number}
   */
  // TODO: Move to bach-js
  get unit () {
    return this.headers['pulse-beats-per-measure'] || 4
  }

  /**
   * Determines the cursors of both the current measure and beat of the track
   *
   * @returns {Object}
   */
  // TODO: Rename to `current`
  //  - Lol, rename back to `cursor` actually
  // get cursor () {
  get current () {
    return {
      measure : Math.min(Math.max(this.index.measure, 0), this.data.length - 1),
      beat    : Math.min(Math.max(this.index.beat,    0), this.data[this.index.measure].length - 1),
      // cursor  : (this.index.measure * this.unit) + this.index.beat
      // cursor  : Math.min(this.index.cursor, this.total.beats)
      step    : Math.min(Math.max(this.index.step,    0), this.total.beats),
      tick    : this.index.tick
    }
  }
  get cursor () {
    return this.current
  }

  get sound () {
    return this.music
  }

  /**
   * Determines how much time remains (in milliseconds) until the next tick.
   *
   * @returns {Number}
   */
  get until () {
    return this.interval * (1 - (this.beatAt() % 1))
  }

  /**
   * Determines the progress of the track's audio (in milliseconds).
   *
   * @returns {Number}
   */
  get progress () {
    return this.music.seek() * 1000
  }

  /**
   * Determines the duration of the track's audio (in milliseconds).
   *
   * @returns {Number}
   */
  get duration () {
    return this.music.duration() * 1000
  }

  /**
   * Translates a monotonic time position to a global pulse beat index (i.e. "step")
   *
   * @returns {Number} time in milliseconds
   */
  // FIXME: Think this is just generally wrong
  translate (time) {
    const progress = time / this.duration
    const index = this.total.beats * progress

    return index

    // return this.total.beats * this.progress
  }

  /**
   * Translates a 
  occurs (step) {

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
    this.music.on('load', () => {
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
    this.music.unload()
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
   * @param {number} to position in the track in milliseconds
   */
  // WARN: probably can't even support this because of dynamic interval (step can change arbitrarily)
  // NOTE: if we assume every interval is the same, relative to tempo, this could work
  seek (to) {
    this.music.seek(to / 1000)
    this.jump(to)
    // this.music.play()
    this.emit('seek')
  }

  /**
   * Invokes the action to perform on each interval
   *
   * @param {Object} [context] stateful dynamic interval context
   * @returns {Object} updated interval context
   */
  step (context) {
    const { last, interval, state } = this
    const { beat } = state
    const { duration, exists } = beat
    const wait = interval * duration

    if (last)   this.emit('beat:stop', last)
    if (exists) this.emit('beat:play', beat)

    this.bump(beat)

    return Object.assign({}, context, { wait })
  }

  /**
   * Increases the cursor to the next beat of the track and, if we're on the last beat,
   * also increases the cursor to the next measure.
   */
  bump (beat) {
    const size = {
      measures : this.data.length,
      beats    : this.data[this.index.measure].length
    }

    const limit = {
      measure : Math.max(size.measures, 1),
      beat    : Math.max(size.beats,    1),
      step    : Math.max(this.total.beats)
    }

    const increment = {
      measure: this.index.beat === (limit.beat - 1) ? 1 : 0,
      beat: 1,
      step: beat.exists ? 1 : 0
    }

    // this.index.measure = (this.index.measure + increment.measure) % limit.measure
    // this.index.beat    = (this.index.beat    + increment.beat)    % limit.beat
    // this.index.step    = (this.index.step    + increment.step)    % limit.step

    this.index.measure = Math.floor(this.index.measure + increment.measure) % limit.measure
    this.index.beat    = Math.floor(this.index.beat    + increment.beat)    % limit.beat
    this.index.step    = Math.floor(this.index.step    + increment.step)    % limit.step
    // this.index.tick++


    // for (const key in this.index) {
    //   this.index[key] = Math.floor(this.index[key] + increment[key]) % limit[key]
    // }

    console.log('[gig] bumped!', JSON.stringify(this.index))
  }

  /**
   * Moves the cursor to the provided time, translated to the global pulse beat index.
   *
   * @param {Object} [to] monotonic timestamp or time position of audio
   */
  jump (to) {
    const { beats, measures } = this.total
    const step = Math.floor(this.translate(to))
    const measure = Math.floor(step / measures)
    // TODO: Consider moving towards absolute values (e.g. 2.334 vs. 2), but requires refactoring/gaurds around .bump
    // const step = this.translate(to)
    // const measure = step / measures
    const beat = step % this.pulses

    console.log('[gig:jump] to, measure, beat, step', to, measure, beat, step)

    Object.assign(this.index, { measure, beat, step })
  }

  /**
   * Determines if the track's music is loading
   */
  loading () {
    return this.music.state() === 'loading'
  }

  /**
   * Determines if the track's music is loaded
   */
  loaded () {
    return this.music.state() === 'loaded'
  }

}

Object.assign(Track.prototype, EventEmitter.prototype)

export const defaultTimer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true })
