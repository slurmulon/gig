// import { Track, Sections } from 'bach-js'
import { Music as Track } from 'bach-js'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import now from 'performance-now'
import EventEmitter from 'events'

/**
 * Represents a musical song/track that can be synchronized with arbitrary behavior and data in real-time
 */
export class Gig extends Track {

  /**
   * @param {Object} source track represented in Bach.JSON
   * @param {Audio} [audio] track audio
   * @param {boolean} [loop] enable track looping
   * @param {boolean} [tempo] in beats per minute [REMOVED]
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [howler] optional Howler configuration overrides
   */
  constructor ({ source, audio, loop, stateless, timer, howler }) {
    super(source)

    EventEmitter.call(this)

    this.audio  = audio
    this.loop   = loop
    // this.tempo  = tempo // FIXME: Sync with Howler's rate property
    this.timer  = timer || defaultTimer

    this.index = 0
    this.times = { origin: null, last: null }
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
   * Determines if the track is actively playing
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
   * The amount of time that's elapsed since the track started playing.
   *
   * Used to determine the cursor step when Gig is set to stateless.
   *
   * @returns {Float}
   */
  get elapsed () {
    return this.times.origin != null ? (now() - this.times.origin) : 0
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
   * The duration of the track's audio (in milliseconds).
   *
   * @returns {Number}
   */
  get duration () {
    return this.durations.cast(this.durations.total, { as: 'ms' })
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
    return this.current / (this.durations.total - 1)
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
    return this.loops ? Math.Infinity : this.duration
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
    this.times.origin = now()

    this.emit('start')
    this.is('playing')
  }

  /**
   * Loads the audio data and kicks off the synchronization clock
   */
  play () {
    if (this.audible) {
      this.music.on('load', () => {
        this.start()
        this.music.play()
        this.emit('play')
      })
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

    this.clock.pause()
    this.emit('pause')

    return this.is('paused')
  }

  /**
   * Resumes the audio and the synchronization clock
   */
  resume () {
    if (this.audible) this.music.play()

    this.clock.resume()
    this.emit('resume')

    return this.is('playing')
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
   * @param {number} to position in the track in seconds
   * @fixme
   */
  // WARN: probably can't even support this because of dynamic interval (step can change arbitrarily)
  // NOTE: if we assume every interval is the same, relative to tempo, this could work
  seek (to) {
    if (this.audible) this.music.seek(to)
    // TODO: this.reorient()
    this.emit('seek')

    return this
  }

  /**
   * Invokes the action to perform on each interval and emits
   * various events based on current state of the step.
   */
  step () {
    const { state, interval } = this
    const { beat, play, stop } = state
    const { duration } = beat

    if (stop.length) {
      this.emit('stop:beat', stop)
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
    }

    // this.index++
    this.index = beat.index
    this.times.last = now()
  }

  /**
   * Moves playback cursor to the provided duration.
   *
   * WARN: Work in progress
   */
  travel (duration, is = 'step') {
    const step = this.durations.cast(duration, { is, as: 'step' })
    const time = this.durations.cast(step, { as: 'ms' })
    const last = this.durations.cast(Math.floor(step), { as: 'ms' })

    this.index = Math.floor(step)
    this.times.last = last
    this.times.origin = now() - time

    return this
  }

  /**
   * Resets the cursor indices to their initial unplayed state
   */
  reset () {
    this.index = 0
    this.times = { origin: null, last: null }

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

export const defaultTimer = track => setStatefulDynterval(track.step.bind(track), { wait: track.interval, immediate: true })

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

export const CONSTANTS = Gig.CONSTANTS = {
  STATUS,
  ACTIVE_STATUS,
  INACTIVE_STATUS,
  EXPIRED_STATUS
}
