import { Entity } from "./entity"

export interface IRepository <Type extends Entity> {
  insert(entity: Type): Promise<Type>
  update(entity: Type): Promise<Type>
  findById(entityId: Number): Promise<Type>
  remove(entityId: Number): Promise<Type>
  findAll(): Promise<Type[]>
}

