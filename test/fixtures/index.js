import fs from 'fs'

export default {
  slow: {
    json  : JSON.parse(fs.readFileSync('./test/fixtures/slow.bach.json')),
    audio : fs.readFileSync('./test/fixtures/slow.wav')
  }
}
