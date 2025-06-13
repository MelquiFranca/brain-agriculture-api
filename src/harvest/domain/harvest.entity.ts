import { ValidationError } from "@base/shared/validators/validation-error"
import { Entity } from "@base/shared/entity"
import { HarvestValidator } from "./harvest.validator"
import { Producer } from "@base/producer/domain/producer.entity"
import { Farm } from "@base/farm/domain/farm.entity"

export type HarvestProps = {
  harvestId?: Number
  name: string
  year: Number
  farm: Farm
}

export type HarvestCreateCommand = {
  name: string
  year: Number
  farm: Farm
  totalArableArea: Number
  totalVegetationArea: Number
  producer: Producer
}

export class Harvest extends Entity {
  harvestId?: Number
  name: string
  year: Number
  farm: Farm
  constructor (props: HarvestProps) {
    super()
    Object.assign(this, props)
    Harvest.validate(this)
  }
  static create (props: HarvestCreateCommand): Harvest {
    const harvest = new Harvest(props)
    Harvest.validate(harvest)
    return harvest
  }
  static validate (harvest: Harvest): void {
    const validateResult = new HarvestValidator().validate(harvest)
    if (validateResult.length) {
      throw ValidationError.fromErrors(validateResult)
    }
  }
  changeName (name: string): void {
    this.name = name
  }
  changeYear (year: Number): void {
    this.year = year
  }
  changeFarm (farm: Farm): void {
    this.farm = farm
  }
  toJSON () {
    return {
      harvestId: this.harvestId,
      name: this.name,
      year: this.year,
      farm: this.farm.toJSON()
    }
  }
}