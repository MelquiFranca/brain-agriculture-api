import { Farm } from '@base/farm/domain/farm.entity'
import { Producer } from '@base/producer/domain/producer.entity'
import assert from 'assert'
import { describe, test, mock, afterEach, beforeEach } from 'node:test'
import { Cultivation } from '@base/cultivation/domain/cultivation.entity'
import { Harvest } from '@base/harvest/domain/harvest.entity'

describe('Harvest', () => {
  let harvest: Harvest
  afterEach(() => mock.restoreAll())
  beforeEach(() => {
    harvest = new Harvest({
      harvestId: 1,
      name: 'Name Cultivation',
      year: 2025,
      farm: new Farm({
        farmId: 1,
        name: 'Test Name',
        city: 'Test Name',
        state: 'Test Year',
        totalArea: 100,
        totalArableArea: 50,
        totalVegetationArea: 30,
        producer: new Producer({ producerId: 1, name: 'Test Producer', identifier: '12345678901' })
      })
    })
  })

  describe('constructor', () => {
    test('should create harvest without harvestId', () => {
      const cultivation = new Cultivation({
        name: 'Name Cultivation',
        harvest
      })
      assert.strictEqual(cultivation.name, 'Name Cultivation')
      assert.strictEqual(cultivation.cultivationId, undefined)
    })
    test('should create harvest with harvestId', () => {
      const cultivation = new Cultivation({
        cultivationId: 1,
        name: 'Name Cultivation',
        harvest
      })
      assert.strictEqual(cultivation.name, 'Name Cultivation')
      assert.strictEqual(cultivation.cultivationId, 1)
    })
  })
  describe('toJSON', () => {
    test('should return JSON representation of harvest', () => {
      const cultivation = new Cultivation({
        cultivationId: 1,
        name: 'Name Cultivation',
        harvest
      })
      const { harvest: harvestResult, ...json } = cultivation.toJSON()
      assert.deepStrictEqual(json, {
        cultivationId: 1,
        name: 'Name Cultivation'
      })
      assert.deepStrictEqual(harvestResult, harvest.toJSON())
    })
  })
  describe('changeName', () => {
    test('should change harvest name', () => {
      const cultivation = new Cultivation({
        name: 'Old Name',
        harvest
      })
      cultivation.changeName('New Name')
      assert.strictEqual(cultivation.name, 'New Name')
    })
  })
  describe('changeHarvest', () => {
    test('should change harvest total area', () => {
      const newHarvest = new Harvest({
        harvestId: 2,
        name: 'New Name',
        year: 2020,
        farm: new Farm({
          farmId: 2,
          name: 'New Name',
          city: 'New City',
          state: 'New State',
          totalArea: 200,
          totalArableArea: 100,
          totalVegetationArea: 60,
          producer: new Producer({ producerId: 2, name: 'New Producer', identifier: '09876543210' })
        })
      })
      const cultivation = new Cultivation({
        name: 'Old Name',
        harvest
      })
      cultivation.changeHarvest(newHarvest)
      assert.deepStrictEqual(cultivation.harvest.toJSON(), newHarvest.toJSON())
    })
  })
})