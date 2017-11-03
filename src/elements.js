import teoria from 'teoria'

/**
 * Represents a single playable element (Note, Scale, Chord, Mode, Triad or Rest)
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

  get kind () {
    const explicits = ['Note', 'Scale', 'Chord', 'Mode', 'Triad', 'Rest']
    const keyword = this.data.atom.keyword

    if (explicits.includes(keyword)) {
      return keyword.toLowerCase()
    }

    return this.identify()
  }

  identify () {
    let identity

    try {
      teoria.note(this.value)
      identity = 'note'
    } catch (_) {}

    try {
      teoria.scale(this.value)
      identity = 'scale'
    } catch (_) {}

    try {
      teoria.chord(this.value)
      identity = 'chord'
    } catch (_) {}

    return identity
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
    return !this.empty ? this.data.duration : 0
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
    if (beats instanceof Array) { // in other words, a measure
      return beats.map(beat => new Beat(beat))
    }

    return new Beat(beats)
  }

}
