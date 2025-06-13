import IValidatorFields from '@base/shared/validators/validator-fields.interface'
import { Producer } from './producer.entity'

export class ProducerValidator implements IValidatorFields {
  validate(entity: Producer): string[] {
    const errors = []
    if (!entity.name || entity.name.length > 255) {
      errors.push('Name must be a non-empty string with a maximum length of 255 characters.')
    }
    if (entity.producerId && !Number.isInteger(entity.producerId)) {
      errors.push('Producer ID must be a number.')
    }
    return errors
  }
}