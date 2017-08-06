import { Howl } from 'howler'
import setDynterval from 'dynamic-interval'

// TODO: http://stackoverflow.com/questions/24724852/pause-and-resume-setinterval

// TODO: need to support track time meta information in warble
export class Track {

  // data = warble track
  constructor ({ source, audio, loop, volume, tempo, on }) {
    this.source = source
    // this.data   = data
    // this.meta   = meta
    this.audio  = audio
    this.loop   = loop
    this.volume = volume
    this.tempo  = tempo // TODO: fully support this later, tricky (seemingly)
    this.on     = on || { step: { } }

    this.index = { measure: 0, beat: 0 }
    this.music = new Howl({ src: audio, loop })
    this.heart = setDynterval(this.step, { wait: this.interval }) // TODO: consider only setting the interval on `play`

    this.listen()
  }

  get data () {
    return this.source.data
  }

  get headers () {
    return this.source.headers
  }

  get state () {
    const measure = this.data[this.cursor.measure]
    const beat    = this.data[measure][this.cursor.beat]

    return { measure, beat }
  }

  get cursor () {
    return {
      measure : Math.min(Math.max(this.index.measure, 0), this.data.length),
      beat    : Math.min(Math.max(this.index.beat, 0), this.headers.time[1])
    }
  }

  get interval () {
    const tempos = {
      init: this.headers.tempo
      user: this.tempo
    }

    const diff = tempos.user / tempos.init

    return this.headers['ms-per-beat'] * diff
  }

  listen () {
    music.on('play',  this.play)
    music.on('pause', this.pause)
    music.on('stop',  this.stop)
    music.on('rate',  this.rate)
    music.on('seek',  this.seek)
  }

  // TODO: integrate core Howler event handler
  // load, loaderror, play, end, pause, stop, mute, volume, rate, seek, fade
  emit (topic, data) {
    const action = this.on instanceof Object && this.on[topic]

    if (action instanceof Function) {
      action(data)
    }
  }

  play () {
    this.music.play()
    this.emit('play')
  }

  stop () {
    this.music.stop()
  }

  pause () {
    this.music.pause()

    // capture state of interval
    // pause interval
  }

  mute () {
    this.music.mute()
  }

  seek (to) { // in seconds
    this.music.seek(to)
  }

  /**
   * The action to perform on next interval
   */
  step (interval) {
    // TODO: create function that maps current time in track to a beat in the track!
    // TODO: wrap the above in a generator that can be yielded

    // 1. determine current position (beat) in warble based on the current position and time signature of the track (and this.interval, the lowest common denominator beat)
    // 2. find all notes that should be played on the current beat
    // 3. play and render any notes on the current beat
    // 4. update the tempo if necessary (low priority)
    // 5. increase track cursor by one beat
    const beat      = this.state.beat
    const wait      = this.interval
    const duration  = wait * beat.duration
    const play      = this.on.step.start || () => beat
    const stop      = this.on.step.stop  || () => beat

    console.log('DAS NOTES', beat)

    play(beat)
    setTimeout(() => stop(beat), duration)

    return Object.assign(interval, { wait })
  }

  static read (path) {
    return new Track({ source: require(path) })
  }

}
