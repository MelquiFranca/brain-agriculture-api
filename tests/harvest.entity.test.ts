import { Farm } from '@base/farm/domain/farm.entity'
import { Producer } from '@base/producer/domain/producer.entity'
import { Harvest } from '@base/harvest/domain/harvest.entity'
import assert from 'assert'
import { describe, test, mock, afterEach, beforeEach } from 'node:test'

describe('Harvest', () => {
  let farm: Farm
  afterEach(() => mock.restoreAll())
  beforeEach(() => {
    farm = new Farm({
      farmId: 1,
      name: 'Test Name',
      city: 'City Name',
      state: 'Test Year',
      totalArea: 100,
      totalArableArea: 50,
      totalVegetationArea: 30,
      producer: new Producer({ producerId: 1, name: 'Test Producer', identifier: '12345678901' })
    })
  })

  describe('constructor', () => {
    test('should create harvest without harvestId', () => {
      const harvest = new Harvest({
        name: 'Name Harvest',
        year: 2025,
        farm
      })
      assert.strictEqual(harvest.name, 'Name Harvest')
      assert.strictEqual(harvest.year, 2025)
      assert.strictEqual(harvest.harvestId, undefined)
    })
    test('should create harvest with harvestId', () => {
      const harvest = new Harvest({
        harvestId: 1,
        name: 'Name Harvest',
        year: 2025,
        farm
      })
      assert.strictEqual(harvest.name, 'Name Harvest')
      assert.strictEqual(harvest.year, 2025)
      assert.strictEqual(harvest.harvestId, 1)
    })
  })
  describe('toJSON', () => {
    test('should return JSON representation of harvest', () => {
      const harvest = new Harvest({
        harvestId: 1,
        name: 'Name Harvest',
        year: 2025,
        farm
      })
      const { farm: farmResult, ...json } = harvest.toJSON()
      assert.deepStrictEqual(json, {
        harvestId: 1,
        name: 'Name Harvest',
        year: 2025
      })
      assert.deepStrictEqual(farmResult, farm.toJSON())
    })
  })
  describe('changeName', () => {
    test('should change harvest name', () => {
      const harvest = new Harvest({
        name: 'Old Name',
        year: 2025,
        farm
      })
      harvest.changeName('New Name')
      assert.strictEqual(harvest.name, 'New Name')
    })
  })
  describe('changeYear', () => {
    test('should change harvest year', () => {
      const harvest = new Harvest({
        name: 'Old Name',
        year: 2025,
        farm
      })
      harvest.changeYear(2020)
      assert.strictEqual(harvest.year, 2020)
    })
  })
  describe('changeFarm', () => {
    test('should change harvest total area', () => {
      const newFarm = new Farm({
        farmId: 2,
        name: 'New Name',
        city: 'New City',
        state: 'New State',
        totalArea: 200,
        totalArableArea: 100,
        totalVegetationArea: 60,
        producer: new Producer({ producerId: 2, name: 'New Producer', identifier: '98765432100' })
      })
      const harvest = new Harvest({
        name: 'Old Name',
        year: 2025,
        farm
      })
      harvest.changeFarm(newFarm)
      assert.deepStrictEqual(harvest.farm.toJSON(), newFarm.toJSON())
    })
  })
})