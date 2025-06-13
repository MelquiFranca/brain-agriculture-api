import { IModel } from "./model.interface"
import { IOperationsModel, QueryModelResult } from "./operation-model.interface"

export class FarmModel implements IOperationsModel {
  private static readonly TABLE_NAME = 'farms'
  getInsertQuery (): QueryModelResult {
    const columns = Object.keys(this).join(', ')
    const values = Object.values(this)
    const placeholders = Object.keys(this).map((_, index) => `$${index + 1}`).join(', ')
    const text = `INSERT INTO ${FarmModel.TABLE_NAME} (${columns}) VALUES (${placeholders})`
    return { text, values }
  }
  createTableQuery (): string {
    return `CREATE TABLE IF NOT EXISTS ${FarmModel.TABLE_NAME} (
      farm_id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      total_area NUMERIC NOT NULL,
      total_arable_area NUMERIC NOT NULL,
      total_vegetation_area NUMERIC NOT NULL,
      producer_id INTEGER NOT NULL,
      FOREIGN KEY (producer_id) REFERENCES producers(producer_id)
    )`
  }
  getUpdateQuery (model: IModel): QueryModelResult {
    const setClause = Object.keys(model)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ')
    const text = `UPDATE ${FarmModel.TABLE_NAME} SET ${setClause} WHERE farm_id = $${Object.keys(model).length + 1}`
    const values = [...Object.values(model), model.id]
    return { text, values }
  }
  getDeleteQuery (modelId: Number): QueryModelResult {
    const text = `DELETE FROM ${FarmModel.TABLE_NAME} WHERE farm_id = $1`
    const values = [modelId]
    return { text, values }
  }
  getSelectByIdQuery (modelId: Number): QueryModelResult {
    const text = `SELECT * FROM ${FarmModel.TABLE_NAME}
      LEFT JOIN harvest ON harvest.farm_id = farms.farm_id
      LEFT JOIN cultivations ON cultivations.cultivation_id = harvest.cultivation_id
      WHERE farm_id = $1`
    const values = [modelId]
    return { text, values }
  }
  getSelectAllQuery (): string {
    return `SELECT * FROM ${FarmModel.TABLE_NAME}`
  }
}