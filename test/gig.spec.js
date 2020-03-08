import chai from 'chai'
import chaiThings from 'chai-things'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { Gig } from '../dist/bundle'
import fixtures from './fixtures'

const should = chai.should()

chai.use(chaiThings)
chai.use(sinonChai)

describe('Gig', () => {
  describe('constructor', () => {
    it('should throw a TypeError if the source data is not in Bach.JSON', () => {
      (() => new Gig({ source: { foo: 'bar' } })).should.throw(TypeError)
    })
  })

  describe('step', () => {
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    it('should play the current beat', done => {
      const gig = new Gig({ source, audio })
      const wait  = source.headers['ms-per-beat']

      gig.step = sinon.spy()

      gig.start()

      setTimeout(() => {
        gig.step.should.have.been.called

        done()
      }, wait + 5)
    }).timeout(0)

    it('should wait ms-per-beat between each step', done => {
      const gig = new Gig({ source, audio })
      const wait = source.headers['ms-per-beat']
      const steps = 3
      const duration = wait * steps
      const startTime = Date.now()
      let lastTime

      gig.step = () => {
        lastTime = Date.now()
      }

      gig.start()

      setTimeout(() => {
        const targetTime = startTime + duration

        lastTime.should.be.closeTo(targetTime, 10)

        done()
      }, duration + 5)
    }).timeout(0)

    it('should recursively step through the track\'s measures and beats', done => {
      const gig = new Gig({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const steps = 2
      const duration = wait * steps

      gig.step = sinon.spy()

      gig.start()

      setTimeout(() => {
        gig.step.callCount.should.equal(4)

        done()
      }, duration - 5)
    }).timeout(0)

    it('should call the step\'s play callback at the beginning of each beat', done => {
      const gig = new Gig({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const callback = sinon.spy()

      gig.on('beat:play', callback)

      gig.start()

      setTimeout(() => {
        callback.should.have.been.calledTwice

        done()
      }, wait)
    }).timeout(0)

    it('should call the step\'s stop callback at the end of each beat', done => {
      const gig = new Gig({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const steps = 2
      const duration = wait * steps
      const callback = sinon.spy()

      gig.on('beat:stop', callback)

      gig.start()

      setTimeout(() => {
        callback.should.have.been.calledTwice

        done()
      }, duration)
    }).timeout(0)
  })

  describe('play', () => {
    // TODO
  })

  describe('start', () => {
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    it('should instantiate the clock after an optional delay', done => {
      const timer = sinon.spy()
      const delay = 2
      const gig = new Gig({ source, audio, delay, timer })
      const wait = gig.interval * delay

      gig.start()

      timer.should.not.have.been.called

      setTimeout(() => {
        timer.should.have.been.calledWith(gig)

        done()
      }, wait)
    }).timeout(0)

    it('should emit the start event after an optional delay', done => {
      const emit = sinon.spy()
      const delay = 2
      const gig = new Gig({ source, audio, delay })
      const wait = gig.interval * delay

      gig.on('start', emit)
      gig.start()

      emit.should.not.have.been.called

      setTimeout(() => {
        emit.should.have.been.called

        done()
      }, wait)
    }).timeout(0)
  })

  describe('stop', () => {
    let gig
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    beforeEach(() => {
      gig = new Gig({ source, audio })
      gig.clock = { stop: sinon.spy() }
      gig.music = { once: (topic, func) => func(), play: sinon.spy(), stop: sinon.spy() }
    })

    it('should return early if no clock is provided', () => {
      const stopped = gig.stop()

      should.not.exist(stopped)
    })

    it('should stop the audio', done => {
      gig.on('play', () => {
        gig.stop()

        gig.music.stop.should.have.been.called

        done()
      })

      gig.play()
    }).timeout(0)

    it('should stop the clock', done => {
      gig.on('play', () => {
        gig.stop()

        gig.clock.stop.should.have.been.called

        done()
      })

      gig.play()
    }).timeout(0)

    it('should emit a \'stop\' event', done => {
      gig.on('play', () => {
        gig.emit = sinon.spy()

        gig.stop()

        gig.emit.should.have.been.calledWith('stop')

        done()
      })

      gig.play()
    }).timeout(0)
  })

  describe('pause', () => {
    let gig
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    beforeEach(() => {
      gig = new Gig({ source, audio })
      gig.clock = { pause: sinon.spy() }
      gig.music = { once: (topic, func) => func(), play: sinon.spy(), pause: sinon.spy() }
    })

    it('should pause the audio', done => {
      gig.on('play', () => {
        gig.pause()

        gig.music.pause.should.have.been.called

        done()
      })

      gig.play()
    }).timeout(0)

    it('should pause the clock', done => {
      gig.on('play', () => {
        gig.pause()

        gig.clock.pause.should.have.been.called

        done()
      })

      gig.play()
    }).timeout(0)

    it('should emit a \'pause\' event', done => {
      gig.on('play', () => {
        gig.emit = sinon.spy()

        gig.pause()

        gig.emit.should.have.been.calledWith('pause')

        done()
      })

      gig.play()
    }).timeout(0)
  })

  describe('resume', () => {
    let gig
    const source = fixtures.fast.json
    const audio  = fixtures.fast.audio

    beforeEach(() => {
      gig = new Gig({ source, audio })
      gig.clock = {
        pause: sinon.spy(),
        resume: sinon.spy()
      }
      gig.music = {
        once: (topic, func) => func(),
        play: sinon.spy(),
        pause: sinon.spy(),
        resume: sinon.spy()
      }
    })

    it('should resume the audio', done => {
      gig.on('play', () => {
        gig.pause()
        gig.resume()

        gig.music.play.should.have.been.called

        done()
      })

      gig.play()
    }).timeout(0)

    it('should resume/play the clock', done => {
      gig.on('play', () => {
        gig.pause()
        gig.resume()

        gig.clock.resume.should.have.been.called

        done()
      })

      gig.play()
    }).timeout(0)

    it('should emit a \'resume\' event', done => {
      gig.on('play', () => {
        gig.emit = sinon.spy()

        gig.pause()
        gig.resume()

        gig.emit.should.have.been.calledWith('resume')

        done()
      })

      gig.play()
    }).timeout(0)
  })

  describe('interval', () => {
    it('should return ms-per-beat by default', () => {
      // TODO
    })
  })
})
