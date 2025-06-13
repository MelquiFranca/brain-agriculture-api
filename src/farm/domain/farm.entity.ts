import { ValidationError } from "@base/shared/validators/validation-error"
import { Entity } from "@base/shared/entity"
import { FarmValidator } from "./farm.validator"

export type FarmProps = {
  farmId?: Number
  city: string
  state: string
  totalArea: Number
  totalArableArea: Number
  totalVegetationArea: Number
}

export type FarmCreateCommand = {
  city: string
  state: string
  totalArea: Number
  totalArableArea: Number
  totalVegetationArea: Number
}

export class Farm extends Entity {
  farmId?: Number
  city: string
  state: string
  totalArea: Number
  totalArableArea: Number
  totalVegetationArea: Number
  constructor (props: FarmProps) {
    super()
    Object.assign(this, props)
    Farm.validate(this)
  }
  static create (props: FarmCreateCommand): Farm {
    const farm = new Farm(props)
    Farm.validate(farm)
    return farm
  }
  static validate (farm: Farm): void {
    const validateResult = new FarmValidator().validate(farm)
    if (validateResult.length) {
      throw ValidationError.fromErrors(validateResult)
    }
  }
  changeCity (city: string): void {
    this.city = city
  }
  changeState (state: string): void {
    this.state = state
  }
  changeTotalArea (totalArea: Number): void {
    this.totalArea = totalArea
  }
  changeTotalArableArea (totalArableArea: Number): void {
    this.totalArableArea = totalArableArea
  }
  changeTotalVegetationArea (totalVegetationArea: Number): void {
    this.totalVegetationArea = totalVegetationArea
  }
  toJSON () {
    return {
      farmId: this.farmId,
      city: this.city,
      state: this.state,
      totalArea: this.totalArea,
      totalArableArea: this.totalArableArea,
      totalVegetationArea: this.totalVegetationArea,
    }
  }
}