import { Producer } from '@base/domain/producer.entity'
import assert from 'assert'
import { describe, test } from 'node:test'

describe('Productor', () => {
  describe('constructor', () => {
    test('should create producer  without producerId', () => {
      const producer = new Producer({
        name: 'Test Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.name, 'Test Producer')
      assert.strictEqual(producer.identifier, '12345678901')
      assert.strictEqual(producer.producerId, undefined)
    })
    test('should create producer with producerId', () => {
      const producer = new Producer({
        producerId: 1,
        name: 'Test Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.name, 'Test Producer')
      assert.strictEqual(producer.identifier, '12345678901')
      assert.strictEqual(producer.producerId, 1)
    })
  })
  describe('toJSON', () => {
    test('should return JSON representation of producer', () => {
      const producer = new Producer({
        producerId: 1,
        name: 'Test Producer',
        identifier: '12345678901'
      })
      const json = producer.toJSON()
      assert.deepStrictEqual(json, {
        producerId: 1,
        name: 'Test Producer',
        identifier: '12345678901'
      })
    })
  })
  describe('changeName', () => {
    test('should change producer name', () => {
      const producer = new Producer({
        name: 'Old Name',
        identifier: '12345678901'
      })
      producer.changeName('New Name')
      assert.strictEqual(producer.name, 'New Name')
    })
  })
  describe('changeIdentifier', () => {
    test('should change producer identifier', () => {
      const producer = new Producer({
        name: 'Test Producer',
        identifier: '12345678901'
      })
      producer.changeIdenfifier('09876543210')
      assert.strictEqual(producer.identifier, '09876543210')
    })
  })
})