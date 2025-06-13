import { Farm } from '@base/farm/domain/farm.entity'
import { Producer } from '@base/producer/domain/producer.entity'
import assert from 'assert'
import { describe, test, mock, afterEach } from 'node:test'

describe('Farm', () => {
  afterEach(() => mock.restoreAll())
  const producer = new Producer({
    producerId: 1,
    name: 'Test Producer',
    identifier: '12345678901'
  })

  describe('constructor', () => {
    test('should create farm  without farmId', () => {
      const farm = new Farm({
        city: 'City Farm',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      assert.strictEqual(farm.city, 'City Farm')
      assert.strictEqual(farm.state, 'State Farm')
      assert.strictEqual(farm.totalArea, 100)
      assert.strictEqual(farm.totalArableArea, 50)
      assert.strictEqual(farm.totalVegetationArea, 30)
      assert.strictEqual(farm.farmId, undefined)
    })
    test('should create farm with farmId', () => {
      const farm = new Farm({
        farmId: 1,
        city: 'City Farm',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      assert.strictEqual(farm.city, 'City Farm')
      assert.strictEqual(farm.state, 'State Farm')
      assert.strictEqual(farm.totalArea, 100)
      assert.strictEqual(farm.totalArableArea, 50)
      assert.strictEqual(farm.totalVegetationArea, 30)
      assert.strictEqual(farm.farmId, 1)
    })
  })
  describe('toJSON', () => {
    test('should return JSON representation of farm', () => {
      const farm = new Farm({
        farmId: 1,
        city: 'City Farm',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      const { producer: producerResult, ...json } = farm.toJSON()
      assert.deepStrictEqual(json, {
        farmId: 1,
        city: 'City Farm',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30
      })
      assert.deepStrictEqual(producerResult, producer.toJSON())
    })
  })
  describe('changeCity', () => {
    test('should change farm city', () => {
      const farm = new Farm({
        city: 'Old Name',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      farm.changeCity('New Name')
      assert.strictEqual(farm.city, 'New Name')
    })
  })
  describe('changeState', () => {
    test('should change farm state', () => {
      const farm = new Farm({
        city: 'Old Name',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      farm.changeState('New Name')
      assert.strictEqual(farm.state, 'New Name')
    })
  })
  describe('changeTotalArea', () => {
    test('should change farm total area', () => {
      const farm = new Farm({
        city: 'Old Name',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      farm.changeTotalArea(120)
      assert.strictEqual(farm.totalArea, 120)
    })
  })
  describe('changeTotalArableArea', () => {
    test('should change farm total arable area', () => {
      const farm = new Farm({
        city: 'Old Name',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      farm.changeTotalArableArea(40)
      assert.strictEqual(farm.totalArableArea, 40)
    })
  })
  describe('changeTotalVegetationArea', () => {
    test('should change farm total vegetation area', () => {
      const farm = new Farm({
        city: 'Old Name',
        state: 'State Farm',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer
      })
      farm.changeTotalVegetationArea(40)
      assert.strictEqual(farm.totalVegetationArea, 40)
    })
  })
})