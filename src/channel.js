import { Track } from './track'

// TODO: Deprecate. Too basic to support natively and introduce inflexibility
export class Channel {

  constructor (track, clock) {
    this.track = track
  }

  // TODO: Redo this, just sucks
  // TODO: Allow users to optionally fade out other playing tracks/sounds instead of stopping them
  play (track) {
    if (this.track) this.track.stop()

    this.track = track

    this.track.play()
  }

}
