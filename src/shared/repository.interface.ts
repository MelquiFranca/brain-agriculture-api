import { Entity } from "./entity"

export interface IRepository <Type extends Entity> {
  insert(entity: Type): Promise<void>
  update(entity: Type): Promise<void>
  findById(entityId: number): Promise<Type>
  remove(entityId: number): Promise<void>
  findAll(): Promise<Type[]>
}

