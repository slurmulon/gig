export class Interval {

  constructor (step, wait) {
    this.step  = step
    this.wait  = wait
    this.state = states.pristine
    this.time  = { start: null, end: null, remaining: null, clock: null }
  }

  next () {
    if (state !== states.resumed) return

    this.step()
    this.run()
  }

  run () {
    this.time.start = new Date()
    this.time.clock = setInterval(this.step, wait) // TODO: test with setDynterval, but probably pointless since it breaks reference
    this.state = states.running
  }

  pause () {
    if (state !== states.running) return

    this.remaining = wait - (new Date() - this.time.start)

    clearInterval(this.time.clock)

    this.state = states.paused
  }

  resume () {
    if (state !== states.paused) return

    this.state = states.resumed

    setTimeout(this.next, this.time.remaining)
  }

  clear () {
    // TODO; the rest

    this.state = states.cleared
  }

}

export const states = {
  pristine : Symbol(),
  running  : Symbol(),
  paused   : Symbol(),
  resumed  : Symbol(),
  cleared  : Symbol()
}
