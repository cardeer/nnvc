import { IRequestParam } from "../@types/param";
import appendMetadata from "../helpers/appendMetadata";
import { ParamKey } from "./keys";

export function Param(name: string) {
  return function (target: Object, propertyKey: string, paramIndex: number) {
    appendMetadata<IRequestParam>(
      ParamKey,
      {
        name,
        index: paramIndex,
      },
      target,
      propertyKey
    );
  };
}
