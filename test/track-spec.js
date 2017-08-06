import chai from 'chai'
import chaiThings from 'chai-things'
import fs from 'fs'
import { Track } from '../dist/bundle'

chai.should()
chai.use(chaiThings)

describe('Track', () => {
  // FIXME: this is failing because setInterval doesn't kick off UNTIl 2000 ms, not starts and then waits until 2000 ms.
  describe('step', () => {
    it('should play the current beat', (done) => {
      const source = JSON.parse(fs.readFileSync('./test/fixtures/slow.warb.json'))
      const audio  = fs.readFileSync('./test/fixtures/slow.wav')
      const track  = new Track({ source, audio })
      let passes   = false

      track.on.step.stop = beat => passes = true

      track.start()

      setTimeout(() => passes.should.equal(true) && done(), 2000)
    }).timeout(0)

    it('should wait ms-per-beat between each step', () => {

    })
  })
})
