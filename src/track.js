import { Beat } from './elements'
import { Howl } from 'howler'
import { setStatefulDynterval } from 'stateful-dynamic-interval'
// import fs from 'fs'

// TODO: integrate `warble-json-schema` validation
// TODO: add `loop` parameter (default to true)
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
    const delay = this.delay * this.interval

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
  // FIXME: this has a bug where if the duration is 0 it still ends up waiting
  // - I believe this is based on lack of use of `interval`
  // FIXME: when paused on elements with a duration greater than the default interval
  //        then pause and resume doesn't work, it ends up playing the empty beat
  //        for the default interval instead of 0 (diverges from beat)
  //        - I think this might be happening because when we resume, the `step` function is run again, which ends up bumping the next tick!!!!!
  step (interval) {
    console.log('[juke] ~~~~~~~~~~~~~~~~~~~~~~~~~ stepping (interval)!', interval)

    const beat  = this.state.beat
    const next  = this.next.bind(this)
    const play  = this.on.step.play
    const start = this.on.step.start
    const stop  = this.on.step.stop
    const wait  = this.interval
    // const wait  = (interval && interval.wait >= 0) ? interval.wait : this.interval
    const duration = wait * beat.duration

    console.log('[juke] step duration (interval, beat, wait, duration)', interval, beat, wait, duration)

    if (start instanceof Function) {
      start(beat)
    }

    if (beat.exists && play instanceof Function) {
      play(beat)
    }

    // FIXME: this needs to be pauseable, or just avoid the need for it
    //  - could just call stop at the beginning of the next beat, but requires
    //    tracking the previous beat (bleh)
    // setTimeout(() => {
    //   console.log('[juke] stopping', beat, duration)

    //   if (stop instanceof Function) {
    //     stop(beat)
    //   }

    //   // next()
    // }, duration)

    console.log('[juke] step, about to bump next (next duration)', duration)

    // TODO: this is an alternative impl. it avoids timing issues but
    // it prematurely bumps the cursor, before `stop` is called
    next()

    return Object.assign(interval || {}, { wait: duration })
  }

  next () {
    const limit = {
      measure : Math.max(this.data.length, 1),
      beat    : Math.max(this.data[0].length, 1)
    }

    this.index.measure = (this.index.measure + 1) % limit.measure
    this.index.beat    = (this.index.beat    + 1) % limit.beat

    console.log('[juke] updated cursor index (measure, beat(', this.index.measure, this.index.beat)
  }

  // static read (path) {
  //   return new Track({ source: fs.readFileSync(path) })
  // }

}
