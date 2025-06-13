import IValidatorFields from '@base/shared/validators/validator-fields-interface'
import { Harvest } from './harvest.entity'

export class HarvestValidator implements IValidatorFields {
  validate(entity: Harvest): string[] {
    const errors = []
    if (!entity.name || entity.name.length > 100) {
      errors.push('Name must be a non-empty string with a maximum length of 100 characters.')
    }
    if (!Number.isInteger(entity.year)) {
      errors.push('Year must be an integer.')
    }
    if (entity.harvestId && !Number.isInteger(entity.harvestId)) {
      errors.push('Harvest ID must be a number.')
    }
    return errors
  }
}