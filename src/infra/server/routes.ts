import { Router, Express } from 'express'
import { ProducerRepository } from '@base/producer/domain/producer.repository'
import { ProducerModel } from '../database/postgres/producer.model'
import { ProducerController } from '@base/producer/application/producer.controller'
import { IDatabase } from '@base/shared/database.interface'
import { IModel } from '../database/postgres/model.interface'
import { validate } from './authenticator'

export default function (app: Express, database: IDatabase<IModel>) {
  // const router = Router()
  // const loginController = new LoginController(database)
  // router.post(`/${loginController.path}`, loginController.login.bind(loginController))
  // app.use(router)
  
  const routerWithAuthenticator = Router()
  routerWithAuthenticator.use(validate)

  const producerRepository = new ProducerRepository(database, new ProducerModel())
  const producerController = new ProducerController(producerRepository)
  routerWithAuthenticator.post(`/${ProducerController.path}`, producerController.create.bind(producerController))
  app.use(routerWithAuthenticator)
}