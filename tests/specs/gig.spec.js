import Gig from '../../src/gig'
import fixtures from '../fixtures/bach'
import { compose } from 'bach-js'
import { useFakeTimers } from 'jest-fake-timers'

const source = {
  basic: compose(fixtures.basic)
}

const mockGig = (opts) => {
  const clock = useFakeTimers(0, 0)
  // const timer = new StatefulGears(Object.assign({ action: jest.fn() }, opts))

  // Object.defineProperty(timer, 'time', { get: () => clock.mockPerfNow() })

  const gig = new Gig(Object.assign({
    source: source.basic,
    now: () => clock.mockPerfNow()
  }, opts))

  return { gig, clock }
}

describe('unit tests', () => {
  beforeEach(() => jest.useFakeTimers('modern'))
  afterEach(() => jest.clearAllTimers())

  describe('constructor', () => {

  })

  describe('state', () => {

  })

  describe('prev', () => {

  })

  describe('next', () => {

  })

  describe('current', () => {
    describe('determines the global/absolute step beat index', () => {
      test('stateless', () => {
        const { gig, clock } = mockGig()

        expect(gig.current).toBe(0)

        gig.play()

        clock.tick(1000)
        expect(gig.current).toBe(1)

        clock.tick(5000)
        expect(gig.current).toBe(7)
      })

      test('stateful', () => {
        const { gig, clock } = mockGig({ stateless: false })

        expect(gig.current).toBe(0)

        gig.play()

        gig.index = 2
        clock.tick(1000) // to ensure clock doesn't affect results
        expect(gig.current).toBe(2)

        gig.index = 4
        clock.tick(5000) // to ensure clock doesn't affect results
        expect(gig.current).toBe(4)
      })
    })
  })

  describe('cursor', () => {
    describe('determines the cyclic/relative step beat index', () => {
      test('within track duration', () => {
        const { gig, clock } = mockGig()

        gig.play()
        expect(gig.current).toBe(0)

        clock.tick(1000)
        expect(gig.current).toBe(1)

        clock.tick(30000)
        expect(gig.current).toBe(38)
      })

      test('beyond track duration', () => {
        const { gig, clock } = mockGig()

        gig.play()

        clock.tick(32000)
        expect(gig.cursor).toBe(0)

        clock.tick(16000)
        expect(gig.cursor).toBe(20)
      })
    })
  })

  describe('place', () => {

  })

  describe('time', () => {

  })

  describe('unit', () => {

  })

  describe('origin', () => {
    describe('establishes the origin time of run-time playback', () => {
      test('unstarted', () => {
        const { gig, clock } = mockGig()

        expect(gig.origin).toBeNull()
      })

      test('started', () => {
        const { gig, clock } = mockGig()

        clock.tick(5000)
        gig.play()

        expect(gig.origin).toBe(5000)
      })

      test('paused', () => {
        const { gig, clock } = mockGig()

        clock.tick(5000)
        gig.play()

        clock.tick(7500)
        gig.pause()

        clock.tick(20000)
        expect(gig.origin).toBe(25000)
      })
    })
  })

  describe('basis', () => {

  })

  describe('elapsed', () => {

  })

  describe('progress', () => {

  })

  describe('completion', () => {

  })

  describe('stride', () => {

  })

  describe('skew', () => {
    describe('determines how much time has elapsed since the clock has been paused', () => {
      test('paused', () => {
        const { gig, clock } = mockGig()

        gig.play()
        clock.tick(5000)

        gig.pause()
        clock.tick(7500)

        expect(gig.skew).toBe(7500)
      })

      test('unpaused', () => {
        const { gig, clock } = mockGig()

        gig.play()
        clock.tick(5000)

        expect(gig.skew).toBe(0)
      })
    })
  })

  describe('drift', () => {

  })

  describe('offset', () => {

  })

  describe('iterations', () => {

  })

  describe('repeating', () => {

  })

  describe('limit', () => {

  })

  describe('metronome', () => {

  })

  describe('updated', () => {

  })

  describe('globalize', () => {
    describe('converts a localized/cyclic duration into its globalized version', () => {

    })
  })

  describe('moment', () => {
    describe('determines when a duration occurs (in milliseconds, by default) globalized to the run-time origin.', () => {

    })
  })

  describe('travel', () => {

  })
})
