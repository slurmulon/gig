import chai from 'chai'
import chaiThings from 'chai-things'
import fs from 'fs'
import { Element, Beat } from '../dist/bundle'
import fixtures from './fixtures'

const should = chai.should()

chai.use(chaiThings)

describe('Element', () => {
  describe('value', () => {
    it('should return the first input of the element instance/atom', () => {
      const data = fixtures.fast.json.data[0][0].notes
      const elem = new Element(data)

      elem.value.should.equal(elem.inputs[0])
    })
  })

  describe('inputs', () => {
    it('should return the arguments object of the element instance/atom', () => {
      const data = fixtures.fast.json.data[0][0].notes
      const elem = new Element(data)

      elem.inputs.should.equal(data.atom.init['arguments'])
    })
  })

  describe('kind', () => {
    describe('explicit', () => {

    })

    describe('implicit', () => {

    })
  })

  describe('identify', () => {
    describe('note', () => {
      it('should return `"note"` for Note elements', () => {
        const elem = new Element({
          atom: {
            init: {
              'arguments': ['C2']
            }
          }
        })

        elem.identify(elem).should.equal('note')
      })
    })

    describe('scale', () => {
      it('should return `"scale"` for Scale elements', () => {
        const elem = new Element({
          atom: {
            init: {
              'arguments': ['C2 Major']
            }
          }
        })

        elem.identify(elem).should.equal('scale')
      })
    })

    describe('chord', () => {
      it('should return `"chord"` for Chord elements', () => {
        const elem = new Element({
          atom: {
            init: {
              'arguments': ['C2maj7']
            }
          }
        })

        elem.identify(elem).should.equal('chord')
      })

    })
  })
})

describe('Beat', () => {
  describe('duration', () => {

  })

  describe('items', () => {

  })

  describe('empty', () => {

  })

  describe('exists', () => {

  })

  describe('from', () => {

  })
})
