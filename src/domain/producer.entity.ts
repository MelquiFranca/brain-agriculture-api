export type ProducerProps = {
  producerId?: Number
  name: string
  identifier: string
}

export type ProducerCreateCommand = {
  name: string
  identifier: string
}

export class Producer {
  producerId?: Number
  name: string
  identifier: string
  constructor (props: ProducerProps) {
    this.producerId = props.producerId
    this.name = props.name
    this.identifier = props.identifier
  }
  // factory method
  static create (props: ProducerProps): Producer {
    return new Producer(props)
  }
  changeName (name: string): void {
    this.name = name
  }
  changeIdenfifier (identifier: string): void {
    this.identifier = identifier
  }
  toJSON () {
    return {
      producerId: this.producerId,
      name: this.name,
      identifier: this.identifier
    }
  }
}