import { Track } from './track'

export class Channel {

  constructor (track) {
    this.track = track
  }

  play (track) {
    this.track.stop()
    this.track = track
    this.track.play()
  }

}
