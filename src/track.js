import { Beat } from './elements'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
import fs from 'fs'

export class Track {

  constructor ({ source, audio, loop, volume, tempo, delay, timer, on }) {
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

  get data () {
    return this.source.data.map(Beat.from)
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

    return this.headers['ms-per-beat'] / diff
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
    const delay  = this.delay * this.interval
    const config = { wait: this.interval, defer: false }

    setTimeout(() => {
      this.clock = setStatefulDynterval(this.step.bind(this), config, this.timer)
    }, delay || 0)
  }

  play () {
    this.music.once('load', () => {
      if (!this.clock) this.start()

      this.music.play()
      this.emit('play')
    })
  }

  stop () {
    this.music.stop()
    this.clock.clear()
  }

  pause () {
    this.music.pause()
    this.clock.pause()
  }

  resume () {
    this.music.play()
    this.clock.resume()
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
  // TODO: support `bach.Set` (i.e. concurrent elements)
  step (interval) {
    const beat  = this.state.beat
    const next  = this.next.bind(this)
    const play  = this.on.step.play
    const start = this.on.step.start
    const stop  = this.on.step.stop
    const wait  = this.interval * beat.duration

    if (start instanceof Function) {
      start(beat)
    }

    if (beat.exists && play instanceof Function) {
      play(beat)
    }

    // FIXME: a way simpler way to do this is to just see if the index is greater than the first
    // if so, just call stop with the previous beat
    const finish = () => {
      if (stop instanceof Function) {
        const after = setStatefulDynterval(() => {
          stop(beat)

          after.clear()
        }, { wait, defer: false })

        this.clock.add(after)
      }
    }

    next()
    finish()

    return Object.assign(interval || {}, { wait })
  }

  next () {
    const limit = {
      measure : Math.max(this.data.length,    1),
      beat    : Math.max(this.data[0].length, 1)
    }

    this.index.measure = (this.index.measure + 1) % limit.measure
    this.index.beat    = (this.index.beat    + 1) % limit.beat
  }

  static read (path) {
    return new Track({ source: fs.readFileSync(path) })
  }

}
