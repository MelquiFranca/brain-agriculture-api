import { ValidationError } from "@base/shared/validators/validation-error"
import { Entity } from "@base/shared/entity"
import { CultivationValidator } from "./cultivation.validator"
import { Harvest } from "@base/harvest/domain/harvest.entity"

export type CultivationProps = {
  cultivationId?: Number
  name: string
  harvest: Harvest
}

export type CultivationCreateCommand = {
  name: string
  harvest: Harvest
}

export class Cultivation extends Entity {
  cultivationId?: Number
  name: string
  harvest: Harvest
  constructor (props: CultivationProps) {
    super()
    Object.assign(this, props)
    Cultivation.validate(this)
  }
  static create (props: CultivationCreateCommand): Cultivation {
    const cultivation = new Cultivation(props)
    Cultivation.validate(cultivation)
    return cultivation
  }
  static validate (cultivation: Cultivation): void {
    const validateResult = new CultivationValidator().validate(cultivation)
    if (validateResult.length) {
      throw ValidationError.fromErrors(validateResult)
    }
  }
  changeName (name: string): void {
    this.name = name
  }
  changeHarvest (harvest: Harvest): void {
    this.harvest = harvest
  }
  toJSON () {
    return {
      cultivationId: this.cultivationId,
      name: this.name,
      harvest: this.harvest.toJSON()
    }
  }
}