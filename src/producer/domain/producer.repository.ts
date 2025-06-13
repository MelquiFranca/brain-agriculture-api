import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "./producer.entity"
import { IDatabase } from "@base/shared/database.interface"
import { IModel } from "@base/infra/database/postgres/model.interface"
import { ProducerModel } from "@base/infra/database/postgres/producer.model"

export class ProducerRepository implements IRepository<Producer> {
  constructor(
    private readonly database: IDatabase<IModel>,
    private readonly producerModel: ProducerModel
  ) {}
  async insert(entity: Producer): Promise<any> {
    const { producerId, ...dataEntity } = entity.toJSON()
    const { producer_id, ...resultData } = await this.database
      .setModelOperations(this.producerModel)
      .insert({ ...dataEntity, id: producerId })
    return Producer.create({
      producerId: producer_id,
      ...resultData
    })
  }
  async update(entity: Producer): Promise<Producer> {
    const { producerId, ...dataEntity } = entity.toJSON()
    const { producer_id, ...resultData } = await this.database
      .setModelOperations(this.producerModel)
      .update({ ...dataEntity, id: producerId })
    return Producer.create({
      producerId: producer_id,
      ...resultData
    })
  }
  async findById(entityId: number): Promise<Producer> {
    const result = await this.database
      .setModelOperations(this.producerModel)
      .findById(entityId)
    return new Producer({
      producerId: result.producer_id,
      identifier: result.identifier,
      name: result.name
    })
  }
  async remove(entityId: number): Promise<Producer> {
    const result = await this.database
      .setModelOperations(this.producerModel)
      .remove(entityId)
    return new Producer({
      producerId: result.producer_id,
      identifier: result.identifier,
      name: result.name
    })
  }
  async findAll(): Promise<Producer[]> {
    const result = await this.database
      .setModelOperations(this.producerModel)
      .findAll()
    return result.map((data) => new Producer({
      producerId: data.producer_id,
      identifier: data.identifier,
      name: data.name
    }))
  }
}

