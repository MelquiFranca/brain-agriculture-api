import { IUseCase } from "@base/shared/application/use-case.interface"
import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "../domain/producer.entity"

export class DeleteProducerUseCase implements IUseCase<DeleteProducerInput, DeleteProducerOutput>{
  constructor (private readonly repository: IRepository<Producer>) {}
  async execute(input: DeleteProducerInput): Promise<DeleteProducerOutput> {
    const producer = await this.repository.remove(input.id)
    return producer.toJSON()
  }
}
export type DeleteProducerInput = {
  id: Number
}
export type DeleteProducerOutput = {
  producerId: Number
  name: string
  identifier: string
}