import "reflect-metadata";
import { Router } from "express";
import { IRequestMetadata } from "../@types/request";
import { BodyKey, ParamKey, QueryKey } from "../decorators/keys";
import { IRequestParam } from "../@types/param";
import bindRequestParams from "./bindings/bindRequestParams";
import bindRequestQueries from "./bindings/bindRequestQueries";
import bindRequestBody from "./bindings/bindRequestBody";

export default function createRouter(
  router: Router,
  request: IRequestMetadata,
  target: Object,
  newTarget: Object
) {
  const value = request.descriptor.value as Function;

  const params: IRequestParam[] = Reflect.getOwnMetadata(
    ParamKey,
    target,
    request.name
  );

  const queryIndex: number = Reflect.getOwnMetadata(
    QueryKey,
    target,
    request.name
  );

  const bodyIndex: number = Reflect.getOwnMetadata(
    BodyKey,
    target,
    request.name
  );

  const paramsList: any[] = [];

  if (request.method === "get") {
    router.get(request.path, async (req, res) => {
      bindRequestParams(paramsList, params, req);
      bindRequestQueries(paramsList, queryIndex, req);
      bindRequestBody(paramsList, bodyIndex, req);

      res.send(await value.call(newTarget, ...paramsList));
    });
  }
}
