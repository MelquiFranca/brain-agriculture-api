import { IModel } from "./model.interface"
import { IOperationsModel, QueryModelResult } from "./operation-model.interface"

export class ProducerModel implements IOperationsModel {
  private static readonly TABLE_NAME = 'producers'
  getInsertQuery (): QueryModelResult {
    const columns = Object.keys(this).join(', ')
    const values = Object.values(this)
    const placeholders = Object.keys(this).map((_, index) => `$${index + 1}`).join(', ')
    const text = `INSERT INTO ${ProducerModel.TABLE_NAME} (${columns}) VALUES (${placeholders})`
    return { text, values }
  }
  createTableQuery (): string {
    return `CREATE TABLE IF NOT EXISTS ${ProducerModel.TABLE_NAME} (
      producer_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      identifier VARCHAR(14) NOT NULL UNIQUE
    )`
  }
  getUpdateQuery (model: IModel): QueryModelResult {
    const setClause = Object.keys(model)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ')
    const text = `UPDATE ${ProducerModel.TABLE_NAME} SET ${setClause} WHERE producer_id = $${Object.keys(model).length + 1}`
    const values = [...Object.values(model), model.id]
    return { text, values }
  }
  getDeleteQuery (modelId: Number): QueryModelResult {
    const text = `DELETE FROM ${ProducerModel.TABLE_NAME} WHERE producer_id = $1`
    const values = [modelId]
    return { text, values }
  }
  getSelectByIdQuery (modelId: Number): QueryModelResult {
    const text = `SELECT * FROM ${ProducerModel.TABLE_NAME}
      LEFT JOIN farms ON farms.producer_id = ${ProducerModel.TABLE_NAME}.producer_id
      LEFT JOIN harvest ON harvest.farm_id = farms.farm_id
      LEFT JOIN cultivations ON cultivations.cultivation_id = harvest.cultivation_id
      WHERE ${ProducerModel.TABLE_NAME}.producer_id = $1`
    const values = [modelId]
    return { text, values }
  }
  getSelectAllQuery (): string {
    return `SELECT * FROM ${ProducerModel.TABLE_NAME}`
  }
}