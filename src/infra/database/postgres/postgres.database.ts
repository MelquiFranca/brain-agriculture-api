import { Client } from "pg"
import { IDatabase } from "../../../shared/database.interface"
import { IModel } from "./model.interface"
import { IOperationsModel } from "./operation-model.interface"

export class PostgresDatabase implements IDatabase<IModel> {
  constructor(private readonly client: Client, private readonly modelOperations: IOperationsModel) {}
  async insert(model: IModel): Promise<void> {
    const query = this.modelOperations.getInsertQuery(model)
    await this.client.query(query)
  }
  async update(model: IModel): Promise<void> {
    const query = this.modelOperations.getUpdateQuery(model)
    await this.client.query(query)
  }
  async findById(modelId: Number): Promise<any> {
    const query = this.modelOperations.getSelectByIdQuery(modelId)
    const result = await this.client.query(query)
    return result.rows[0]
  }
  async remove(modelId: number): Promise<void> {
    const query = this.modelOperations.getDeleteQuery(modelId)
    const result = await this.client.query(query)
  }
  async findAll(): Promise<any[]> {
    const text = this.modelOperations.getSelectAllQuery()
    const result = await this.client.query(text)
    return result.rows
  }
}