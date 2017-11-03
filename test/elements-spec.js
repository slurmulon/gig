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
      const data = fixtures.slow.json.data[0][0].notes
      const elem = new Element(data)

      elem.value.should.equal(elem.inputs[0])
    })
  })

  describe('inputs', () => {
    it('should return the arguments object of the element instance/atom', () => {

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

    })

    describe('scale', () => {

    })

    describe('chord', () => {

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
