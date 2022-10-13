import { IRequestMetadata } from '@/@types/request'
import appendMetadata from '@/helpers/appendMetadata'
import { RequestKey } from '../keys'

export function Delete(path: string) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    appendMetadata<IRequestMetadata>(
      RequestKey,
      {
        name: propertyKey,
        method: 'delete',
        path,
        descriptor,
      },
      target
    )
  }
}
