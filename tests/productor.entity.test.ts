import { Producer } from '@base/domain/producer.entity'
import assert from 'assert'
import { describe, test } from 'node:test'

describe('Productor', () => {
  describe('constructor', () => {
    test('should create producer  without producer_id', () => {
      const producer = new Producer({
        name: 'Test Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.name, 'Test Producer')
      assert.strictEqual(producer.identifier, '12345678901')
      assert.strictEqual(producer.producer_id, undefined)
    })
    test('should create producer with producer_id', () => {
      const producer = new Producer({
        producer_id: 1,
        name: 'Test Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.name, 'Test Producer')
      assert.strictEqual(producer.identifier, '12345678901')
      assert.strictEqual(producer.producer_id, 1)
    })
  })
  describe('toJSON', () => {
    test('should return JSON representation of producer', () => {
      const producer = new Producer({
        producer_id: 1,
        name: 'Test Producer',
        identifier: '12345678901'
      })
      const json = producer.toJSON()
      assert.deepStrictEqual(json, {
        producer_id: 1,
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