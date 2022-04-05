import { Music as Track } from 'bach-js'
import { clock } from './timer'
// TODO: Switch to Tone.Player
import { Howl } from 'howler'
// import now from 'performance-now'
import hrtime from 'performance-now'
import EventEmitter from 'events'

/**
 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
 */
export class Gig extends Track {

  /**
   * @param {Object} source track represented in Bach.JSON
   * @param {Audio} [audio] track audio
   * @param {boolean} [loop] enable track looping
   * @param {Object} [timer] alternative timer API (default is monotonic and uses raf)
   * @param {Function} [now] custom monotonic timer function
   * @param {Object} [howler] optional Howler configuration overrides
   * @param {boolean} [stateless] enable stateless/monotonic cursor
   */
  constructor ({ source, audio, loop, timer, now, howler, stateless = true } = {}) {
    super(source)

    EventEmitter.call(this)

    this.audio = audio
    this.loop = loop
    // this.tempo  = tempo // FIXME: Sync with Howler's rate property
    this.timer  = timer || clock
    this.now = now || hrtime

    this.index = 0
    this.times = { origin: null, last: null, beat: null, paused: null }
    this.status = STATUS.pristine
    this.stateless = stateless

    if (audio) {
      this.music = new Howl(Object.assign({
        src: audio,
        loop
      }, howler))
    }

    // this.listen()
  }

  /**
   * Provides the beat found at the track's cursor
   *
   * @returns {Object}
   */
  get state () {
    return this.at(this.cursor)
  }

  /**
   * Provides beat found one step behind the track's cursor
   *
   * @returns {Object}
   */
  get prev () {
    return this.at(this.cursor - 1)
  }

  /**
   * Provides the beat found one step ahead of the track's cursor
   *
   * @returns {Object}
   */
  get next () {
    return this.at(this.cursor + 1)
  }

  /**
   * Determines the cyclic/relative step beat index.
   *
   * @returns {Number}
   */
  get cursor () {
    return this.durations.cyclic(this.current)
  }

  /**
   * Determines the global/absolute step beat index.
   * When stateless the step is calculated based on monotonic time.
   * When stateful the step is calculated based on current index value.
   *
   * @returns {Number}
   */
  get current () {
    return !this.stateless ? this.index : Math.floor(this.place)
  }

  /**
   * Determines the global/absolute step beat based on elapsed monotonic time.
   *
   * @returns {Number}
   */
  get place () {
    return this.durations.cast(this.elapsed, { is: 'ms', as: 'step' })
  }

  /**
   * Centralized getter that allows for custom monotomic timer functions (`now`).
   * Defaults to process.hrtime polyfill when a custom `now` function is not provided.
   *
   * @returns {Number}
   */
  get time () {
    return typeof this.now === 'function' && this.clock ? this.now(this.clock) : hrtime()
  }

  /**
   * Determines the base bach-js duration unit to use based on stateless config.
   *
   * Can be provided to cast as `is`: `gig.durations.cast(4, { is: gig.unit })`.
   *
   * @returns {String}
   */
  get unit () {
    return this.stateless ? 'ms' : 'step'
  }

  /**
   * Determines if the cursor is on the first step
   *
   * @returns {Boolean}
   */
  get first () {
    return this.cursor === 0
  }

  /**
   * Determines if the cursor is on the least measure, beat, or section
   *
   * @returns {Boolean}
   */
  get last () {
    return this.cursor === this.durations.total
  }

  /**
   * Determines if the track is actively playing
   *
   * @returns {Boolean}
   */
  get playing () {
    return this.status === STATUS.playing
  }

  /**
   * Determines if the track is paused
   *
   * @returns {Boolean}
   */
  get paused () {
    return this.status === STATUS.paused
  }

  /**
   * Determines if the track's music is loading (when audible).
   */
  get loading () {
    return this.audible ? this.music.state() === 'loading' : false
  }

  /**
   * Determines if the track's music is loaded (when audible).
   */
  get loaded () {
    return this.audible ? this.music.state() === 'loaded' : this.active
  }

  /**
   * Determines if the track is pristine (i.e. hasn't changed status since initialization).
   *
   * @returns {Boolean}
   */
  get pristine () {
    return this.status === STATUS.pristine
  }

  /**
   * Determines if the track is actively playing (currently the same as .playing)
   *
   * @returns {Boolean}
   */
  get active () {
    return ACTIVE_STATUS.includes(this.status)
  }

  /**
   * Determines if the track is inactive
   *
   * @returns {Boolean}
   */
  get inactive () {
    return INACTIVE_STATUS.includes(this.status)
  }

  /**
   * Determines if the track is expired
   *
   * @returns {Boolean}
   */
  get expired () {
    return EXPIRED_STATUS.includes(this.status)
  }

  /**
   * Determines if the track has a status where baseline playback can be started
   *
   * @returns {Boolean}
   */
  get based () {
    return BASED_STATUS.includes(this.status)
  }

  /**
   * The total duration of the track's run-time (in milliseconds).
   *
   * @returns {Number}
   */
  get duration () {
    return this.durations.cast(this.durations.total, { as: 'ms' })
  }

  /**
   * Establishes the origin time of run-time playback, skewed to pause time.
   *
   * @returns {Number}
   */
  get origin () {
    return this.times.origin != null ? this.times.origin + this.skew : null
  }

  /**
   * Determines the base time of the current step.
   *
   * @returns {Number}
   */
  get basis () {
    return (this.times.last || this.times.origin) + this.skew
  }

  /**
   * The amount of time that's elapsed since the track started playing.
   *
   * Used to determine the cursor step when Gig is set to stateless.
   *
   * @returns {Float}
   */
  get elapsed () {
    return this.origin != null ? (this.time - this.origin) : 0
  }

  /**
   * The progress of the track's audio (in milliseconds), modulated to 1 (e.g. 1.2 -> 0.2).
   *
   * @returns {Number}
   */
  get progress () {
    return this.completion % 1
  }

  /**
   * The run-time completion of the entire track (values exceeding 1 mean the track has looped).
   *
   * @returns {Number}
   */
  get completion () {
    return this.elapsed / this.duration
  }

  /**
   * The run-time progression (0-1) of the current step.
   *
   * @returns {Number}
   */
  get stride () {
    return (this.time - this.basis) / this.interval
  }

  /**
   * Determines the skew, in ms, of the clock. Returns 0 if no pause time exists.
   *
   * @returns {Number}
   */
  get skew () {
    return this.time - (this.times.paused || this.time)
  }

  /**
   * Determines the amount of run-time drift, in ms, of the current beat.
   *
   * @returns {Number}
   */
  get drift () {
    return this.times.beat ? ((this.times.beat + this.skew) - this.moment(this.state.beat.index)) : 0
  }

  /**
   * Provides an offset, in steps, based on the total number of iterations.
   * Useful for adjusting between absolute (global) and relative (cyclic) duration calculations.
   *
   * @returns {Number}
   */
  get offset () {
    return this.durations.total * Math.floor(this.iterations)
  }

  /**
   * Whether or not the Gig object has associated audio.
   *
   * @returns {Boolean}
   */
  get audible () {
    return this.audio && this.music
  }

  /**
   * Whether or not the track is configured to loop playback indefinitely.
   *
   * @returns {Boolean}
   */
  get loops () {
    return this.loop || !!(this.audible && this.music.loop())
  }

  /**
   * Changes loop configuration of track and associated audio.
   *
   * @returns {Boolean}
   */
  set loops (loop) {
    this.loop = loop

    if (this.audible) {
      this.music.loop(loop)
    }
  }

  /**
   * Determines the number of times the track has already looped/repeated.
   *
   * @returns {Number}
   */
  get iterations () {
    return this.current / this.durations.total
  }

  /**
   * Determines if the track has already looped/repeated.
   *
   * @returns {Boolean}
   */
  get repeating () {
    return this.iterations >= 1
  }

  /**
   * Specifies the limit of steps in a track
   *
   * @returns {Number}
   */
  get limit () {
    return this.loops ? Math.Infinity : this.durations.total
  }

  /**
   * Provides the index of the current pulse beat under the context of a looping metronome.
   *
   * @returns {Number}
   */
  get metronome () {
    return this.durations.metronize(this.elapsed, { is: 'ms' })
  }

  /**
   * Determines if the current step's beat has changed from the previous step's beat.
   *
   * @returns {Boolean}
   */
  get updated () {
    return this.state.beat.index !== this.prev.beat.index
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
    this.clock = this.timer(this)
    this.times.origin = this.time

    this.emit('start')
    this.is('playing')
  }

  /**
   * Loads the audio data and kicks off the synchronization clock
   */
  play () {
    if (this.audible) {
      const ready = () => {
        this.start()
        this.music.play()
        this.emit('play')
      }

      if (this.loaded) {
        ready()
      } else {
        this.music.on('load', ready)
      }
    } else {
      this.start()
      this.emit('play')
    }

    return this
  }

  /**
   * Stops the audio and the synchronization clock (no resume)
   */
  stop () {
    if (!this.clock) return this

    if (this.audible) {
      this.music.stop()
      this.music.unload()
    }

    this.clock.stop()
    this.emit('stop')

    return this.reset().is('stopped')
  }

  /**
   * Pauses the audio and the synchronization clock
   */
  pause () {
    if (this.audible) this.music.pause()

    this.times.paused = this.time

    this.clock.pause()
    this.emit('pause')

    return this.is('paused')
  }

  /**
   * Resumes the audio and the synchronization clock
   */
  resume () {
    if (this.audible) this.music.play()

    const skew = this.time - this.times.paused

    this.times.origin += skew
    this.times.last += skew
    this.times.beat += skew
    this.times.paused = null

    this.clock.resume()
    this.emit('resume')

    return this.is('playing')
  }

  /**
   * Toggles playback based on the current run-time status.
   */
  toggle () {
    if (this.based) {
      return this.play()
    } else if (this.playing) {
      return this.pause()
    } else if (this.paused) {
      return this.resume()
    }

    return this
  }

  /**
   * Mutes the track audio
   */
  mute () {
    if (this.audible) this.music.mute()

    this.emit('mute')

    return this
  }

  /**
   * Seek to a new position in the track
   *
   * @param {Number} duration time value
   * @param {String} [is] duration unit
   */
  seek (duration, is = 'step') {
    if (this.audible) {
      const max = this.durations.cast(this.music.duration(), { is: 'second', as: is })
      const time = this.durations.cyclic(duration, { is, as: 'second', max })

      this.music.seek(time)
    }

    this.travel(duration, is)
    this.emit('seek')

    return this
  }

  /**
   * Invokes the action to perform on each interval and emits
   * various events based on current state of the step.
   * Only emits beat events if the beat has updated from the previous step.
   */
  step () {
    this.index = this.times.last ? this.index + 1 : 0

    const { state, interval } = this
    const { beat, play, stop } = state
    const { duration } = beat

    this.emit('step', state)

    if (stop.length) {
      this.emit('stop:beat', stop)
    }

    if (!this.stateless && !this.updated) {
      return this
    }

    if (this.repeating && this.first) {
      if (this.loops) {
        this.emit('loop', state)
      } else {
        return this.kill()
      }
    }

    if (play.length) {
      this.emit('play:beat', beat)
      this.times.beat = this.time
    }

    this.times.last = this.time

    return this
  }

  /**
   * Converts a localized/cyclic duration into its globalized version.
   * The inverse of this conversion can be achieved with Gig.durations.cyclic().
   *
   * @param {Number} duration time value
   * @param {Object} [lens] unit conversions
   * @returns {Number}
   */
  globalize (duration, { is = 'step', as = 'step' } = {}) {
    return this.durations.cyclic(duration, { is, as }) + this.durations.cast(this.offset, { as })
  }

  /**
   * Determines when a duration occurs (in milliseconds, by default) globalized to the run-time origin.
   *
   * @param {Number} duration time value
   * @param {Object} [lens] unit conversions
   * @returns {Number}
   */
  moment (duration, { is = 'step', as = 'ms' } = {}) {
    const time = this.globalize(duration, { is, as: 'ms' })
    const moment = this.origin + time

    return this.durations.cast(moment, { is: 'ms', as })
  }

  /**
   * Moves playback cursor to the provided duration.
   *
   * @param {Number} duration time value
   * @param {String} [is] duration unit
   */
  travel (duration, is = 'step') {
    if (this.based) {
      console.warn('[gig:travel] Currently unsupported on tracks that have not started playing')

      return this
    }

    const step = this.durations.cast(duration, { is, as: 'step' })
    const time = this.durations.cast(step, { as: 'ms' })
    const index = Math.floor(step)
    const last = this.durations.cast(index, { as: 'ms' })
    const state = this.at(index)

    this.index = index
    this.times.last = last
    this.times.origin = this.time - this.skew - time
    this.times.beat = this.moment(state.beat.index)

    // TODO: Determine if we want to emit a different event here instead for greater specificity and control
    // TODO: Consider if we should emit `stop` as well on the beat we traveled from
    if (state.play.length && this.paused) {
      this.emit('play:beat', state.beat)
    }

    return this
  }

  /**
   * Resets the cursor indices to their initial unplayed state
   */
  reset () {
    this.index = 0
    this.times = { origin: null, last: null, paused: null, beat: null }

    return this
  }

  /**
   * Removes all active event listeners
   *
   * TODO: Consider automatically stopping the track here if already running
   */
  // purge
  clear () {
    return this.removeAllListeners()
  }

  /**
   * Immediately stops the track, its clock, and removes all active event listeners
   */
  kill () {
    return this.stop().clear().is('killed')
  }

  /**
   * Updates the playing status of the track (idempotent, no reactivity or side-effects).
   */
  is (status) {
    const key = status.toLowerCase()
    const value = STATUS[key]

    if (!value) throw Error(`${key} is an invalid status`)

    this.status = value

    this.emit('update:status', key)

    return this
  }

  /**
   * Determines if the playing status matches the provided status key string.
   *
   * @returns {Boolean}
   */
  check (status) {
    const key = status.toLowerCase()
    const value = STATUS[key]

    return this.status === value
  }

}

Object.assign(Track.prototype, EventEmitter.prototype)

export const STATUS = {
  pristine : Symbol('pristine'),
  playing  : Symbol('playing'),
  stopped  : Symbol('stopped'),
  paused   : Symbol('paused'),
  killed   : Symbol('killed')
}

export const ACTIVE_STATUS = [STATUS.playing]

export const INACTIVE_STATUS = [
  STATUS.pristine,
  STATUS.stopped,
  STATUS.paused,
  STATUS.killed
]

export const EXPIRED_STATUS = [
  STATUS.stopped,
  STATUS.killed
]

export const BASED_STATUS = [
  STATUS.pristine,
  STATUS.stopped,
  STATUS.killed
]

export const CONSTANTS = Gig.CONSTANTS = {
  STATUS,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  EXPIRED_STATUS,
  BASED_STATUS
}

export default Gig
