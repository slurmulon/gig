import fs from 'fs'

export default {
  fast: {
    json : JSON.parse(fs.readFileSync('./test/fixtures/fast.bach.json')),
    audio : fs.readFileSync('./test/fixtures/void.wav')
  },
  slow: {
    json  : JSON.parse(fs.readFileSync('./test/fixtures/slow.bach.json')),
    audio : fs.readFileSync('./test/fixtures/void.wav')
  }
}
