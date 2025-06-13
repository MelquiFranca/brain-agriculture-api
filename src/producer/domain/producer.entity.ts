import { ValidationError } from "@base/shared/validators/validation-error"
import { ProducerValidator } from "./producer.validator"
import { Entity } from "@base/shared/entity"

export type ProducerProps = {
  producerId?: Number
  name: string
  identifier: string
}

export type ProducerCreateCommand = {
  name: string
  identifier: string
}

export class Identifier {
  constructor (public readonly value: string) {
    if (!Identifier.validate(value)) {
      throw new InvalidIdentifierError('Invalid identifier format. It must be an 11-digit number.')
    }
  }
  static validate(identifier: string): boolean {
    return /^\d{11}$/.test(identifier) || /^\d{14}$/.test(identifier)
  }
  getValue(): string {
    return this.value
  }
}

export class InvalidIdentifierError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidIdentifierError'
  }
}

export class Producer extends Entity {
  producerId?: Number
  name: string
  identifier: Identifier
  constructor (props: ProducerProps) {
    super()
    this.producerId = props.producerId
    this.name = props.name
    this.identifier = new Identifier(props.identifier)
    Producer.validate(this)
  }
  static create (props: ProducerCreateCommand): Producer {
    const producer = new Producer(props)
    Producer.validate(producer)
    return producer
  }
  static validate (producer: Producer): void {
    const validateResult = new ProducerValidator().validate(producer)
    if (validateResult.length) {
      throw ValidationError.fromErrors(validateResult)
    }
  }
  changeName (name: string): void {
    this.name = name
  }
  changeIdenfifier (identifier: string): void {
    this.identifier = new Identifier(identifier)
  }
  toJSON () {
    return {
      producerId: this.producerId,
      name: this.name,
      identifier: this.identifier.getValue()
    }
  }
}