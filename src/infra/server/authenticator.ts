import jwt, { JwtPayload } from 'jsonwebtoken'
import {  Request, Response, NextFunction } from 'express'

const SECRET_PUBLIC_KEY = 'sunda'
const EXPIRES_IN = 3600

type DTOLogin = {
}

interface CustomRequest extends Request {
  token: string | JwtPayload
}
export function validate (req: Request, res: Response, next: NextFunction) {
  const { headers: { authorization } } = req
  if (!authorization?.length) {
    res.status(401).send('Not authenticated')
    return
  }
  try {
    const token = jwt.verify(authorization.replace('Bearer ', ''), SECRET_PUBLIC_KEY) as DTOLogin
    (req as CustomRequest).token = token
    next()
  } catch (error: Error | any) {
    res.status(401).send(error.message || 'Not authenticated')
    return
  }
}
export function authenticate (login: DTOLogin) {
  return jwt.sign(login, SECRET_PUBLIC_KEY, { expiresIn: EXPIRES_IN })
}
