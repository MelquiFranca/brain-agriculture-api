import IValidatorFields from '@base/shared/validators/validator-fields-interface'
import { Farm } from './farm.entity'

export class FarmValidator implements IValidatorFields {
  validate(entity: Farm): string[] {
    const errors = []
    if (!entity.city || entity.city.length > 100) {
      errors.push('City must be a non-empty string with a maximum length of 100 characters.')
    }
    if (!entity.state || entity.state.length > 100) {
      errors.push('City must be a non-empty string with a maximum length of 100 characters.')
    }
    if (!Number.isFinite(entity.totalArea) || entity.totalArea.valueOf() <= 0) {
      errors.push('Total area must be a positive number.')
    }
    if (!Number.isFinite(entity.totalArableArea) || entity.totalArableArea.valueOf() < 0) {
      errors.push('Total arable area must be a positive number.')
    }
    if (!Number.isFinite(entity.totalVegetationArea) || entity.totalVegetationArea.valueOf() < 0) {
      errors.push('Total vegetation area must be a positive number.')
    }
    if (entity.farmId && !Number.isInteger(entity.farmId)) {
      errors.push('Farm ID must be a number.')
    }
    return errors
  }
}