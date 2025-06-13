import { IModel } from "./model.interface"

export type QueryModelResult = { text: string, values: any[] }
export interface IOperationsModel {
  getInsertQuery (model: IModel): QueryModelResult
  createTableQuery (): string
  getUpdateQuery (model: IModel): QueryModelResult
  getDeleteQuery (modelId: Number): QueryModelResult
  getSelectByIdQuery (modelId: Number): QueryModelResult
  getSelectAllQuery (): string
}
