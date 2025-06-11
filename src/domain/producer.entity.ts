export type ProducerProps = {
  producer_id?: Number
  name: string
  identifier: string
}

export type ProducerCreateCommand = {
  name: string
  identifier: string
}

export class Producer {
  producer_id?: Number
  name: string
  identifier: string
  constructor (props: ProducerProps) {
    this.producer_id = props.producer_id
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
      producer_id: this.producer_id,
      name: this.name,
      identifier: this.identifier
    }
  }
}