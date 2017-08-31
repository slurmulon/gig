import setDynterval from 'dynamic-interval'

export class Interval {

  constructor (step, wait, defer = false) {
    this.step  = step
    this.wait  = wait // TODO: allow for this to change (to support tempo)
    this.state = states.pristine
    this.time  = { start: null, end: null, remaining: null, clock: null }

    if (!defer) this.run()
  }

  next (config) {
    this.time.start = new Date()

    return this.step(config)
  }

  run () {
    this.time.start = new Date() // works (unnecesary if `next` ends up solving the `remaining` issue)
    // this.time.clock = setInterval(this.step, this.wait) // TODO: test with setDynterval, but probably pointless since it breaks reference
    // this.time.clock = setDynterval(this.step, this.wait) // works, sort of
    this.time.clock = setDynterval(this.next.bind(this), this.wait)
    this.state = states.running
  }

  pause () {
    if (this.state !== states.running) return

    const wait    = this.time.clock.context.wait || this.wait
    const elapsed = new Date() - this.time.start

    // this.time.remaining = wait - (new Date() - this.time.start) // ORIG IMPL
    this.time.remaining = wait - elapsed
    this.time.clock.clear()

    this.state = states.paused
  }

  resume () {
    if (this.state !== states.paused) return

    this.state = states.resumed

    setTimeout(this.pickup, this.time.remaining)
  }

	// callback for when the interval is resumed
  pickup () {
    if (this.state !== states.resumed) return

    this.step()
    this.run()
  }

  clear () {
    this.time.clock.clear()

    this.state = states.cleared
  }

}

export const states = {
  pristine : Symbol('pristine'),
  running  : Symbol('running'),
  paused   : Symbol('paused'),
  resumed  : Symbol('resumed'),
  cleared  : Symbol('cleared')
}
