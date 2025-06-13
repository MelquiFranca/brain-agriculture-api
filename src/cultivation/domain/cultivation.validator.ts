import IValidatorFields from '@base/shared/validators/validator-fields.interface'
import { Cultivation } from './cultivation.entity'

export class CultivationValidator implements IValidatorFields {
  validate(entity: Cultivation): string[] {
    const errors = []
    if (!entity.name || entity.name.length > 100) {
      errors.push('Name must be a non-empty string with a maximum length of 100 characters.')
    }
    if (entity.cultivationId && !Number.isInteger(entity.cultivationId)) {
      errors.push('Cultivation ID must be a number.')
    }
    return errors
  }
}