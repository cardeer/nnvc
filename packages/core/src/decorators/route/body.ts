import 'reflect-metadata'
import { BodyKey } from '../keys'

export function Body(
  target: Object,
  propertyKey: string,
  propertyIndex: number
) {
  Reflect.defineMetadata(BodyKey, propertyIndex, target, propertyKey)
}
