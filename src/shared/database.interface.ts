export interface IDatabase<Type> {
  setModelOperations(operations: any): IDatabase<Type>
  insert(entity: Type): Promise<any>
  update(entity: Type): Promise<any>
  findById(entityId: number): Promise<any>
  remove(entityId: number): Promise<void>
  findAll(): Promise<any[]>
}