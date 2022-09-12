import "reflect-metadata";

export default function appendMetadata<T extends { [key in any]: any }>(
  key: any,
  data: T,
  target: Object,
  propertyKey?: string
) {
  let currentValue: T[] = [];

  if (propertyKey)
    currentValue = Reflect.getOwnMetadata(key, target, propertyKey) || [];
  else currentValue = Reflect.getOwnMetadata(key, target) || [];

  currentValue.push(data);

  if (propertyKey)
    Reflect.defineMetadata(key, currentValue, target, propertyKey);
  else Reflect.defineMetadata(key, currentValue, target);
}
