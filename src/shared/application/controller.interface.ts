import { Request, Response } from "express"

export interface IController {
  create (req: Request, response: Response): Promise<any>
  update (req: Request, response: Response): Promise<any>
  list (req: Request, response: Response): Promise<any>
  delete (req: Request, response: Response): Promise<any>
  findOne (req: Request, response: Response): Promise<any>
}