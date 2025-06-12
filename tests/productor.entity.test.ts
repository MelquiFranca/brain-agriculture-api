import { Identifier, Producer } from '@base/producer/domain/producer.entity'
import assert from 'assert'
import { describe, test, mock, afterEach } from 'node:test'

describe('Productor', () => {
  const mockIdentifierValidate = mock.method(Identifier as any, 'validate')
  afterEach(() => mock.restoreAll())
  describe('constructor', () => {
    test('should create producer  without producerId', () => {
      const producer = new Producer({
        name: 'Test Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.name, 'Test Producer')
      assert.strictEqual(producer.identifier.getValue(), '12345678901')
      assert.strictEqual(producer.producerId, undefined)
    })
    test('should create producer with producerId', () => {
      const producer = new Producer({
        producerId: 1,
        name: 'Test Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.name, 'Test Producer')
      assert.strictEqual(producer.identifier.getValue(), '12345678901')
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
      assert.strictEqual(producer.identifier.getValue(), '09876543210')
    })
  })
  describe('Identifier validation', () => {
    test('should throw error for invalid identifier format', () => {
      assert.throws(() => {
        new Producer({
          name: 'Invalid Producer',
          identifier: 'invalidIdentifier'
        })
      }, {
        name: 'InvalidIdentifierError',
        message: 'Invalid identifier format. It must be an 11-digit number.'
      })
      assert.strictEqual(mockIdentifierValidate.mock.callCount(), 1)
    })

    test('should accept valid 11-digit identifier', () => {
      const producer = new Producer({
        name: 'Valid Producer',
        identifier: '12345678901'
      })
      assert.strictEqual(producer.identifier.getValue(), '12345678901')
      assert.strictEqual(mockIdentifierValidate.mock.callCount(), 1)
    })

    test('should accept valid 14-digit identifier', () => {
      const producer = new Producer({
        name: 'Valid Producer',
        identifier: '12345678901234'
      })
      assert.strictEqual(producer.identifier.getValue(), '12345678901234')
      assert.strictEqual(mockIdentifierValidate.mock.callCount(), 1)
    })
  })
})