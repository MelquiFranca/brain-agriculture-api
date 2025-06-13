import { IUseCase } from "@base/shared/application/use-case.interface"
import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "../domain/producer.entity"

export class CreateProducerUseCase implements IUseCase<CreateProducerInput, CreateProducerOutput>{
  constructor (private readonly repository: IRepository<Producer>) {}
  async execute(input: CreateProducerInput): Promise<CreateProducerOutput> {
    const producer = new Producer(input)
    const result = await this.repository.insert(producer)
    return { producerId: result.producerId }
  }
}
export type CreateProducerInput = {
  identifier: string
  name: string
}
export type CreateProducerOutput = {
  producerId: Number
}