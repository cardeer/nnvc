import "reflect-metadata";
import { Router } from "express";
import { IRequestMetadata, IRequestView } from "../@types/request";
import {
  BodyKey,
  ParamKey,
  QueryKey,
  StatusKey,
  ViewKey,
} from "../decorators/keys";
import { IRequestParam } from "../@types/param";
import bindRequestParams from "./bindings/bindRequestParams";
import bindRequestQueries from "./bindings/bindRequestQueries";
import bindRequestBody from "./bindings/bindRequestBody";
import { HttpMethod } from "src/@types/http";

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

  const view: IRequestView = Reflect.getOwnMetadata(
    ViewKey,
    target,
    request.name
  );

  const status: number = Reflect.getOwnMetadata(
    StatusKey,
    target,
    request.name
  );

  const paramsList: any[] = [];

  router[request.method as HttpMethod](request.path, async (req, res) => {
    bindRequestParams(paramsList, params, req);
    bindRequestQueries(paramsList, queryIndex, req);
    bindRequestBody(paramsList, bodyIndex, req);

    if (view !== undefined) {
      res.status(status || 200).render(view.page || "index", {
        title: view.title || "Document",
      });
    } else {
      res
        .status(status || 200)
        .json(await value.call(newTarget, ...paramsList));
    }
  });
}
