import raf from 'raf'
import now from 'performance-now'

/**
 * Default monotonic/stateless timer for Gig.
 * Uses requestAnimationFrame and performance.now (polyfilled).
 *
 * @param {Gig} gig parent instance provided on construction
 * @param {function} [tick] optional function to call on each tick of the clock
 */
export function clock (gig, tick) {
  let last = null
  let interval = null

  const loop = () => {
    const { time, cursor, expired } = gig

    if (expired) return cancel()
    if (cursor !== last) {
      last = cursor

      gig.step()
    }

    if (typeof tick === 'function') {
      tick(gig, time)
    }

    interval = raf(loop)
  }

  const cancel = () => {
    raf.cancel(interval)

    interval = null
  }

  const timer = {
    play () {
      loop(now())
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
