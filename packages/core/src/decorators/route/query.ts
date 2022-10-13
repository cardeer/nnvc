import 'reflect-metadata'
import { QueryKey } from '../keys'

export function Query(
  target: Object,
  propertyKey: string,
  propertyIndex: number
) {
  Reflect.defineMetadata(QueryKey, propertyIndex, target, propertyKey)
}
