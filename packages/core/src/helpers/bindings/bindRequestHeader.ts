import { IRequestHeaderParam, IRequestParam } from '@/@types/request'
import { Request } from 'express'

export default function bindRequestHeaders(
  paramsList: any[],
  paramsMeta: IRequestHeaderParam[],
  req: Request
) {
  if (paramsMeta) {
    paramsMeta.forEach((param) => {
      paramsList[param.index] = req.headers[param.property]
    })
  }
}
