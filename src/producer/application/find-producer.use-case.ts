import { IUseCase } from "@base/shared/application/use-case.interface"
import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "../domain/producer.entity"

export class FindProducerUseCase implements IUseCase<FindProducerInput, FindProducerOutput>{
  constructor (private readonly repository: IRepository<Producer>) {}
  async execute(input: FindProducerInput): Promise<FindProducerOutput> {
    const producer = await this.repository.findById(input.id)
    return producer.toJSON()
  }
}
export type FindProducerInput = {
  id: Number
}
export type FindProducerOutput = {
  producerId: Number
  name: string
  identifier: string
}