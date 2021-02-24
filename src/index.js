import { Track, Sections } from 'bach-js'
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
   * @param {boolean} [tempo] in beats per minute [REMOVED]
   * @param {number} [delay] wait a duration before starting to play
   * @param {Object} [timer] alternative timer/interval API
   * @param {Object} [howler] optional Howler configuration overrides
   */
  constructor ({ source, audio, loop, delay, timer, howler }) {
    super(source)

    EventEmitter.call(this)

    this.audio  = audio
    this.loop   = loop
    // this.tempo  = tempo // FIXME: Sync with Howler's rate property
    this.delay  = delay
    this.timer  = timer || defaultTimer

    this.index = { measure: 0, beat: 0, section: 0, repeat: 0 }
    this.status = STATUS.pristine

    if (audio) {
      this.music = new Howl(Object.assign({
        src: audio,
        loop
      }, howler))
    }

    // this.listen()
  }

  /**
   * Provides the core data structure backing `sections`, primarily for internal use but useful to have exposed indepdently
   *
   * @returns {Sections}
   */
  get sectionized () {
    return new Sections(this.source)
  }

  /** Provides all of the sections (i.e. the identifiable parts/transitions) of a track
   *
   * @returns {Array}
   */
  get sections () {
    return this.sectionized.all
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
  // TODO: Remove/refactor, this is pointless (we just want to go back 1 cursor index, not both a measure and beat!)
  get prev () {
    return this.at(this.cursor.measure - 1, this.cursor.beat - 1)
  }

  /**
   * Provides the measure and beat found one step ahead of the track's cursor
   *
   * @returns {Object}
   */
  // TODO: Remove/refactor, this is pointless (we just want to go back 1 cursor index, not both a measure and beat!)
  get next () {
    return this.at(this.cursor.measure + 1, this.cursor.beat + 1)
  }

  /**
   * Determines the cursors of the current measure, beat and section of the track
   *
   * @returns {Object}
   */
  get cursor () {
    return {
      measure : Math.min(Math.max(this.index.measure, 0), this.size.measures - 1),
      beat    : Math.min(Math.max(this.index.beat,    0), this.size.beats    - 1),
      section : Math.min(Math.max(this.index.section, 0), this.size.sections - 1)
    }
  }

  /**
   * Provides the current measure, beat and section of the track
   *
   * @returns {Object}
   */
  get current () {
    return {
      measure : this.data[this.cursor.measure],
      beat    : this.data[this.cursor.measure][this.cursor.beat],
      section : this.sections[this.cursor.section]
    }
  }

  /**
   * Provides the total number of measures, beats and sections in a track, relative to the cursor
   *
   * @returns {Object}
   */
  get size () {
    return {
      measures : this.data.length,
      beats    : this.data[this.index.measure].length,
      sections : this.sections.length,
      // repeats  : this.loops ? Infinity : 0
    }
  }

  // get last () {
  //   return {
  //     measure : Math.max(this.size.measures - 1, 0),
  //     beat    : Math.max(this.size.beats - 1, 0),
  //     section : Math.max(this.size.sections - 1, 0),
  //     // repeat  : Math.max(this.size.repeats - 1, 0)
  //   }
  // }

  get first () {
    return {
      measure: this.index.measure === 0,
      beat: this.index.beat === 0,
      section: this.index.section === 0
    }
  }

  get last () {
    return {
      measure: this.index.measure === this.size.measure - 1,
      beat: this.index.beat === this.size.beat - 1,
      section: this.index.section === this.size.section - 1
    }
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
   * Whether or not the Gig object has associated audio
   *
   * @returns {Boolean}
   */
  get audible () {
    return this.audio && this.music
  }

  get loops () {
    return this.loop || !!(this.audible && this.music.loop())
  }

  set loops (loop) {
    this.loop = loop

    if (this.audible) {
      this.music.loop(loop)
    }
  }

  get repeating () {
    return this.index.repeat > 0
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
      this.is('playing')
    }, delay || 0)
  }

  /**
   * Loads the audio data and kicks off the synchronization clock
   */
  // FIXME: sync audio playback with `start` delay
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
   * Invokes the action to perform on each interval
   *
   * @param {Object} [context] stateful dynamic interval context
   * @returns {Object} updated interval context
   */
  step (context) {
    console.log('\n\n\n@@@@@@@@@\nGig step', this.state.beat, this.index.repeat)
    // if (!this.loops && this.index.repeat > 0) {
    if (!this.loops && this.repeating && this.first.section) {
      console.log('GIG KILLING STEP', this.index)
      return this.stop()
    }

    const { state, interval, prev } = this
    const { beat } = state
    const { duration, exists } = beat
    const wait = interval * duration

    console.log('------ step prev', prev)
    console.log('------ step exists', exists)

    if (prev)   this.emit('beat:stop', prev)
    if (exists) this.emit('beat:play', beat)

    this.bump(beat)

    return Object.assign({}, context, { wait })
  }

  /**
   * Increases the cursor to the next beat of the track and, if we're on the last beat,
   * also increases the cursor to the next measure.
   */
  bump (beat) {
    const limit = {
      measure : Math.max(this.size.measures, 1),
      beat    : Math.max(this.size.beats,    1),
      section : Math.max(this.size.sections, 1)
    }

    const increment = {
      repeat: this.index.section === (limit.section - 1) ? 1 : 0,
      measure: this.index.beat === (limit.beat - 1) ? 1 : 0,
      beat: 1,
      section: beat.exists ? 1 : 0
    }

    this.index.measure = Math.floor(this.index.measure + increment.measure) % limit.measure
    this.index.beat = Math.floor(this.index.beat + increment.beat) % limit.beat
    this.index.section = Math.floor(this.index.section + increment.section) % limit.section
    this.index.repeat += increment.repeat
    // this.index.step++

    // if (!this.loops && this.index.section === 0) {
    //   // this.kill()
    //   this.stop()
    // }
  }

  reset () {
    this.index = { measure: 0, beat: 0, section: 0, repeat: 0 }

    console.log('---gig reset index', this.index)

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

  // TODO: Make both of these getters instead
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

export const CONSTANTS = Gig.CONSTANTS = {
  STATUS,
  ACTIVE_STATUS,
  INACTIVE_STATUS
}

export default Gig
