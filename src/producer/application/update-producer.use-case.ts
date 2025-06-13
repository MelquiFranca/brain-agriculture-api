import { IUseCase } from "@base/shared/application/use-case.interface"
import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "../domain/producer.entity"

export class UpdateProducerUseCase implements IUseCase<UpdateProducerInput, UpdateProducerOutput>{
  constructor (private readonly repository: IRepository<Producer>) {}
  async execute(input: UpdateProducerInput): Promise<UpdateProducerOutput> {
    const producer = new Producer(input)
    const result = await this.repository.update(producer)
    return { producerId: result.producerId }
  }
}
export type UpdateProducerInput = {
  identifier: string
  name: string
}
export type UpdateProducerOutput = {
  producerId: Number
}