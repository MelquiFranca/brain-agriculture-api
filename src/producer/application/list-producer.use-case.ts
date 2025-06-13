import { IUseCase } from "@base/shared/application/use-case.interface"
import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "../domain/producer.entity"

export class ListProducerUseCase implements IUseCase<ListProducerInput, ListProducerOutput[]>{
  constructor (private readonly repository: IRepository<Producer>) {}
  async execute(input: ListProducerInput): Promise<ListProducerOutput[]> {
    const result = await this.repository.findAll()
    return result.map(producer => producer.toJSON())
  }
}
export type ListProducerInput = {}
export type ListProducerOutput = {
  producerId: Number
  name: string
  identifier: string
}