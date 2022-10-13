import 'reflect-metadata'
import { IRequestView } from '@/@types/request'
import { ViewKey } from './keys'

export function View(options: IRequestView) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata(ViewKey, options, target, propertyKey)
  }
}
