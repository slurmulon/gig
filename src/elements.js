/**
 * Represents a playable sequence of elements in a track (Note, Scale, Chord, Rest, etc.)
 */
export class Elements {

  constructor (source) {
    this.source = source
  }

  get duration () {
    return this.source.duration
  }

  get items () {
    const notes = this.source.notes
    const items = notes instanceof Array ? notes : [notes]

    return items.map(item => new Element(item))
  }

}

/**
 * Represents a single playable element (Note, Scale, Chord or Rest)
 */
export class Element {

  constructor (source) {
    this.source = source
  }

  get value () {
    return this.inputs[0]
  }

  get inputs () {
    return this.source.atom.init['arguments']
  }

  identify () {
    return this.source.atom.keyword
  }

}
