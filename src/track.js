import { Beat } from './elements'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
// import fs from 'fs'

// TODO: integrate `warble-json-schema` validation
export class Track {

  constructor ({ source, audio, loop, volume, tempo, delay, on }) {
    this.source = source
    this.audio  = audio
    this.loop   = loop
    this.volume = volume
    this.tempo  = tempo
    this.delay  = delay
    this.on     = on || { step: { } }

    this.index = { measure: 0, beat: 0 }
    this.music = new Howl({ src: audio, loop })

    // this.listen()
  }

  get data () {
    return this.source.data.map(Beat.from)
    // return Beat.from(this.source.data)
    // return this.source.data
  }

  get headers () {
    return this.source.headers
  }

  get state () {
    const measure = this.data[this.cursor.measure]
    const beat = measure[this.cursor.beat]

    return { measure, beat }
  }

  get cursor () {
    return {
      measure : Math.min(Math.max(this.index.measure, 0), this.data.length),
      beat    : Math.min(Math.max(this.index.beat,    0), this.data[0].length)
    }
  }

  get interval () {
    const global = this.headers.tempo
    const tempos = {
      init: global,
      user: this.tempo || global
    }

    const diff = tempos.user / tempos.init

    return this.headers['ms-per-beat'] * diff
  }

  listen () {
    this.music.on('play',  this.play)
    this.music.on('pause', this.pause)
    this.music.on('stop',  this.stop)
    this.music.on('rate',  this.rate)
    this.music.on('seek',  this.seek)
  }

  // TODO: integrate core Howler event handler
  // load, loaderror, play, end, pause, stop, mute, volume, rate, seek, fade
  emit (topic, data) {
    const action = this.on instanceof Object && this.on[topic]

    if (action instanceof Function) {
      action(data)
    }
  }

  start () {
    const delay = this.delay * this.interval

    // FIXME: this should be pauseable (use setStatefulDynterval)
    setTimeout(() => {
      this.step() // simulates an immediately invoked interval (TODO: add core support for this to setDynterval)
      this.heart = setStatefulDynterval(this.step.bind(this), { wait: this.interval })
    }, delay || 0)
  }

  play () {
    this.music.once('load', () => {
      if (!this.heart) this.start()

      this.music.play()
      this.emit('play')
    })
  }

  stop () {
    this.music.stop()
    this.heart.clear()
  }

  pause () {
    this.music.pause()
    this.heart.pause()
  }

  resume () {
    this.music.play()
    this.heart.resume()
  }

  mute () {
    this.music.mute()
  }

  // WARN: probably can't even support this because of dynamic interval (step can change arbitrarily)
  // NOTE: if we assume every interval is the same, relative to tempo, this could work
  seek (to) { // in seconds
    this.music.seek(to)
  }

  /**
   * The action to perform on next interval
   */
  step (interval) {
    const beat = this.state.beat
    const next = this.next.bind(this)
    const play = this.on.step.play
    const stop = this.on.step.stop
    const wait = this.interval
    // const duration = wait * ((!beat.empty && beat.duration) || 1)
    const duration = wait * beat.duration

    if (beat.exists && play instanceof Function) {
      play(beat)
    }

    next()

    // stop playing the note after its duration has surpassed
    // note that this can go beyond `wait`, or the duration of the lowest common beat
    setTimeout(() => stop instanceof Function && stop(beat), duration)

    return Object.assign(interval || {}, { wait })
  }

  next () {
    const limit = {
      measure : Math.max(this.data.length    - 1, 1),
      beat    : Math.max(this.data[0].length - 1, 1)
    }

    this.index.measure = (this.index.measure + 1) % limit.measure
    this.index.beat    = (this.index.beat    + 1) % limit.beat
  }

  // static read (path) {
  //   return new Track({ source: fs.readFileSync(path) })
  // }

}
