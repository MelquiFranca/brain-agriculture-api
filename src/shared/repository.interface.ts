import { Entity } from "./entity"

export interface IRepository <Type extends Entity> {
  insert(entity: Type): Promise<Type>
  update(entity: Type): Promise<Type>
  findById(entityId: number): Promise<Type>
  remove(entityId: number): Promise<void>
  findAll(): Promise<Type[]>
}

