/**
 * Represents a single playable element (Note, Scale, Chord or Rest)
 */
export class Element {

  constructor (data) {
    this.data = data
  }

  get value () {
    return this.inputs[0]
  }

  get inputs () {
    return this.data.atom.init['arguments']
  }

  // FIXME: support implicit elements (involves reflecting on the value - can use teoria for this, most likely)
  get kind () {
    return this.data.atom.keyword
  }

}

/**
 * Represents a single beat in a track (Note, Scale, Chord, Rest, etc.)
 *
 * duration -> notes
 */
export class Beat {

  constructor (data) {
    this.data = data
  }

  get duration () {
    return !this.empty ? this.data.duration : 1
  }

  get items () {
    if (this.empty) return []

    const notes = this.data.notes
    const items = notes instanceof Array ? notes : [notes]

    return items.map(item => new Element(item))
  }

  get empty () {
    return !this.data
  }

  get exists () {
    return !this.empty
  }

  static from (beats) {
    if (beats instanceof Array) {
      return beats.map(beat => new Beat(beat))
    }

    return new Beat(beats)
  }

}

// export class Measure {

//   constructor (data) {
//     this.data = data
//   }

//   get items () {
//     return this.data.map(Beat.from)
//   }

// }
