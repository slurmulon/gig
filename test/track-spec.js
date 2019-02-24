import chai from 'chai'
import chaiThings from 'chai-things'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { Track } from '../dist/bundle'
import fixtures from './fixtures'

const should = chai.should()

chai.use(chaiThings)
chai.use(sinonChai)

describe('Track', () => {
  describe('constructor', () => {
    it('should throw a TypeError if the source data is not in Bach.JSON', () => {
      (() => new Track({ source: { foo: 'bar' } })).should.throw(TypeError)
    })
  })

  describe('step', () => {
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    it('should play the current beat', done => {
      const track = new Track({ source, audio })
      const wait  = source.headers['ms-per-beat']

      track.step = sinon.spy()

      track.start()

      setTimeout(() => {
        track.step.should.have.been.called

        done()
      }, wait + 5)
    }).timeout(0)

    it('should wait ms-per-beat between each step', done => {
      const track = new Track({ source, audio })
      const wait = source.headers['ms-per-beat']
      const steps = 3
      const duration = wait * steps
      const startTime = Date.now()
      let lastTime

      track.step = () => {
        lastTime = Date.now()
      }

      track.start()

      setTimeout(() => {
        const targetTime = startTime + duration

        lastTime.should.be.closeTo(targetTime, 10)

        done()
      }, duration + 5)
    }).timeout(0)

    it('should recursively step through the track\'s measures and beats', done => {
      const track = new Track({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const steps = 2
      const duration = wait * steps

      track.step = sinon.spy()

      track.start()

      setTimeout(() => {
        track.step.callCount.should.equal(4)

        done()
      }, duration - 5)
    }).timeout(0)

    it('should call the step\'s stop callback at the end of each beat', done => {
      const track = new Track({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const steps = 2
      const duration = wait * steps
      const callback = sinon.spy()

      track.on('beat:stop', callback)

      track.start()

      setTimeout(() => {
        callback.should.have.been.calledTwice

        done()
      }, duration)
    }).timeout(0)
  })

  describe('play', () => {

  })

  describe('start', () => {
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    it('should instantiate the clock after an optional delay', done => {
      const timer = sinon.spy()
      const delay = 2
      const track = new Track({ source, audio, delay, timer })
      const wait = track.interval * delay

      track.start()

      timer.should.not.have.been.called

      setTimeout(() => {
        timer.should.have.been.calledWith(track)

        done()
      }, wait)
    }).timeout(0)

    it('should emit the start event after an optional delay', done => {
      const emit = sinon.spy()
      const delay = 2
      const track = new Track({ source, audio, delay })
      const wait = track.interval * delay

      track.on('start', emit)
      track.start()

      emit.should.not.have.been.called

      setTimeout(() => {
        emit.should.have.been.called

        done()
      }, wait)
    }).timeout(0)
  })

  describe('stop', () => {
    let track
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    beforeEach(() => {
      track = new Track({ source, audio })
      track.clock = { stop: sinon.spy() }
      track.music = { once: (topic, func) => func(), play: sinon.spy(), stop: sinon.spy() }
    })

    it('should return early if no clock is provided', () => {
      const stopped = track.stop()

      should.not.exist(stopped)
    })

    it('should stop the audio', done => {
      track.on('play', () => {
        track.stop()

        track.music.stop.should.have.been.called

        done()
      })

      track.play()
    }).timeout(0)

    it('should stop the clock', done => {
      track.on('play', () => {
        track.stop()

        track.clock.stop.should.have.been.called

        done()
      })

      track.play()
    }).timeout(0)

    it('should emit a \'stop\' event', done => {
      track.on('play', () => {
        track.emit = sinon.spy()

        track.stop()

        track.emit.should.have.been.calledWith('stop')

        done()
      })

      track.play()
    }).timeout(0)
  })

  describe('pause', () => {
    let track
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    beforeEach(() => {
      track = new Track({ source, audio })
      track.clock = { pause: sinon.spy() }
      track.music = { once: (topic, func) => func(), play: sinon.spy(), pause: sinon.spy() }
    })

    it('should pause the audio', done => {
      track.on('play', () => {
        track.pause()

        track.music.pause.should.have.been.called

        done()
      })

      track.play()
    }).timeout(0)

    it('should pause the clock', done => {
      track.on('play', () => {
        track.pause()

        track.clock.pause.should.have.been.called

        done()
      })

      track.play()
    }).timeout(0)

    it('should emit a \'pause\' event', done => {
      track.on('play', () => {
        track.emit = sinon.spy()

        track.pause()

        track.emit.should.have.been.calledWith('pause')

        done()
      })

      track.play()
    }).timeout(0)
  })

  describe('interval', () => {
    it('should return ms-per-beat by default', () => {

    })
  })
})
