import { IController } from "@base/shared/application/controller.interface"
import { Request, Response } from "express"
import { CreateProducerUseCase } from "./create-producer.use-case"
import { IRepository } from "@base/shared/repository.interface"
import { Producer } from "../domain/producer.entity"
import { ListProducerUseCase } from "./list-producer.use-case"
import { FindProducerUseCase } from "./find-producer.use-case"
import { DeleteProducerUseCase } from "./delete-producer.use-case"
import { UpdateProducerUseCase } from "./update-producer.use-case"

export class ProducerController implements IController {
  constructor (private readonly repository: IRepository<Producer>) {
  }
  async create(request: Request, response: Response): Promise<any> {
    try {
      const { body } = request
      const createProducerUseCase = new CreateProducerUseCase(this.repository)
      const result = await createProducerUseCase.execute(body)
      response.status(201).json(result)
    } catch (error) {
      response.status(400).send(error)
    }
  }
  async list(request: Request, response: Response): Promise<any> {
    try {
      const listProducerUseCase = new ListProducerUseCase(this.repository)
      const result = await listProducerUseCase.execute({})
      response.status(200).json(result)
    } catch (error) {
      response.status(400).send(error)
    }
  }
  async findOne(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.params
      const findProducerUseCase = new FindProducerUseCase(this.repository)
      const result = await findProducerUseCase.execute({ id: Number(id) })
      response.status(200).json(result)
    } catch (error) {
      response.status(400).send(error)
    }
  }
  async delete(request: Request, response: Response): Promise<any> {
    try {
      const { body } = request
      const deleteProducerUseCase = new DeleteProducerUseCase(this.repository)
      const result = await deleteProducerUseCase.execute(body)
      response.status(200).json(result)
    } catch (error) {
      response.status(400).send(error)
    }
  }
  async update(request: Request, response: Response): Promise<any> {
    try {
      const { body } = request
      const updateProducerUseCase = new UpdateProducerUseCase(this.repository)
      const result = await updateProducerUseCase.execute(body)
      response.status(201).json(result)
    } catch (error) {
      response.status(400).send(error)
    }
  }
}