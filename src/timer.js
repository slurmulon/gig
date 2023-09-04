import raf from 'raf'

/**
 * Default monotonic/stateless timer for Gig.
 * Uses requestAnimationFrame and performance.now (polyfilled).
 *
 * @param {Gig} gig parent instance provided on construction
 * @param {function} [tick] optional function to call on each tick of the clock
 */
// TODO: Allow clock to be configured to optionally cancelAnimationFrame(interval) on each tick
export const clock = (gig, tick) => {
  let last = null
  let interval = null

  const loop = () => {
    const { time, cursor, expired, step } = gig

    if (expired) return cancel()

    if (cursor !== last) {
      last = cursor

      step.call(gig)
    }

    if (typeof tick === 'function') {
      tick(time)
    }

    interval = raf(loop)
  }

  const cancel = () => {
    raf.cancel(interval)

    interval = null
  }

  const timer = {
    play () {
      loop()
    },

    pause () {
      cancel()
    },

    resume () {
      timer.play()
    },

    stop () {
      last = null
      cancel()
    }
  }

  timer.play()

  return timer
}

export default clock
