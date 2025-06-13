export interface IDatabase<Type> {
  insert(entity: Type): Promise<void>
  update(entity: Type): Promise<void>
  findById(entityId: number): Promise<any>
  remove(entityId: number): Promise<void>
  findAll(): Promise<Type[]>
}