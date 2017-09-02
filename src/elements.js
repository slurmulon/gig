/**
 * Represents a playable sequence of elements in a track (Note, Scale, Chord, Rest, etc.)
 */
export class Elements {

  constructor (data) {
    this.data = data
  }

  get duration () {
    return this.data.duration
  }

  get items () {
    const notes = this.data.notes
    const items = notes instanceof Array ? notes : [notes]

    return items.map(item => new Element(item))
  }

}

/**
 * Represents a single playable element (Note, Scale, Chord or Rest)
 */
// FIXME: support implicit elements (involves reflecting on the value - can use teoria for this, most likely)
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

  identify () {
    return this.data.atom.keyword
  }

}
