import { Track } from 'bach-js'
import { Howl } from 'howler'
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

    this.index = { measure: 0, beat: 0 }
    this.music = new Howl(Object.assign({
      src: audio,
      loop
    }, howler))

    // this.listen()
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
    const { last, interval, state } = this
    const { beat } = state
    const { duration, exists } = beat
    const wait = interval * duration

    if (last)   this.emit('beat:stop', last)
    if (exists) this.emit('beat:play', beat)

    this.bump()

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

Object.assign(Track.prototype, EventEmitter.prototype)

export const defaultTimer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true })
