import { IRequestMetadata } from "../../@types/request";
import appendMetadata from "../../helpers/appendMetadata";
import { RequestKey } from "../keys";

export function Patch(path: string) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    appendMetadata<IRequestMetadata>(
      RequestKey,
      {
        name: propertyKey,
        method: "patch",
        path,
        descriptor,
      },
      target
    );
  };
}
