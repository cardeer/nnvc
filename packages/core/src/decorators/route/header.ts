import { RequestHeaders, IRequestHeaderParam } from '@/@types/request'
import appendMetadata from '@/helpers/appendMetadata'
import 'reflect-metadata'
import { HeaderKey } from '../keys'

export function Header(property: keyof RequestHeaders) {
  return function (target: Object, propertyKey: string, paramIndex: number) {
    appendMetadata<IRequestHeaderParam>(
      HeaderKey,
      {
        property,
        index: paramIndex,
      },
      target,
      propertyKey
    )
  }
}
