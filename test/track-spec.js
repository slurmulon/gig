import chai from 'chai'
import chaiThings from 'chai-things'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import fs from 'fs'
import { Track } from '../dist/bundle'
import fixtures from './fixtures'

const should = chai.should()

chai.use(chaiThings)
chai.use(sinonChai)

describe('Track', () => {
  describe('step', () => {
    let source = fixtures.fast.json
    let audio  = fixtures.fast.audio

    it('should play the current beat', done => {
      const track = new Track({ source, audio })
      const wait  = source.headers['ms-per-beat']
      const stop  = sinon.spy()

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
      const startTime = Date.now()
      let lastTime

      track.step = () => {
        lastTime = Date.now()
      }

      track.start()

      setTimeout(() => {
        const targetTime = startTime + (wait * steps)

        lastTime.should.be.closeTo(targetTime, 10)

        done()
      }, (wait * steps) + 5)
    }).timeout(0)

    it('should recursively step through the track\'s measures and beats', done => {
      const track = new Track({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const steps = 2

      track.step = sinon.spy()

      track.start()

      setTimeout(() => {
        track.step.should.have.been.calledThrice

        done()
      }, wait * steps)
    }).timeout(0)

    it('should call the step\'s stop callback at the end of each beat', done => {
      const track = new Track({ source, audio, tempo: 240 })
      const wait  = source.headers['ms-per-beat']
      const steps = 2

      track.on.step.stop = sinon.spy()

      track.start()

      setTimeout(() => {
        track.on.step.stop.should.have.been.calledTwice

        done()
      }, wait * steps)
    }).timeout(0)
  })

  describe('play', () => {

  })

  describe('stop', () => {

  })

  describe('interval', () => {
    it('should return ms-per-beat by default', () => {

    })
  })
})
