import chai from 'chai'
import chaiThings from 'chai-things'
import fs from 'fs'
import { Track } from '../dist/bundle'
import fixtures from './fixtures'

const should = chai.should()

chai.use(chaiThings)

// const fixtures = {
//   slow: {
//     json  : JSON.parse(fs.readFileSync('./test/fixtures/slow.warb.json')),
//     audio : fs.readFileSync('./test/fixtures/slow.wav')
//   }
// }

describe('Track', () => {
  // FIXME: this is failing because setInterval doesn't kick off UNTIl 2000 ms, not starts and then waits until 2000 ms.
  describe('step', () => {
    xit('should play the current beat', done => {
      const source = fixtures.slow.json
      const audio  = fixtures.slow.audio
      const track  = new Track({ source, audio })
      const wait   = source.headers['ms-per-beat']
      let passes   = false

      track.on.step.stop = beat => {
        passes = true
      }

      track.start()

      setTimeout(() => {
        passes.should.equal(true)
        done()
      }, wait + 5)
    })//.timeout(0)

    it('should wait ms-per-beat between each step', () => {

    })

    xit('should recursively step through the track\'s measures and beats', done => {
      const source = fixtures.slow.json
      const audio  = fixtures.slow.audio
      const track  = new Track({ source, audio, tempo: 240 })
      const limit  = track.data.length * track.data[0].length

      let steps  = 0
      let passes = false

      track.on.step.start = beat => {
        console.log('stepped through beat', beat.data)
        console.log('steps taken so far', steps)

        steps++
      }

      track.on.step.stop = beat => {
        if (beat && steps === limit) {
          true.should.equal(true)
          done()
        }
      }

      track.start()
    })//.timeout(0)
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
