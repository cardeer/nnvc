import "reflect-metadata";
import { StatusKey } from "./keys";

export function Status(status: number) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Reflect.defineMetadata(StatusKey, status, target, propertyKey);
  };
}
