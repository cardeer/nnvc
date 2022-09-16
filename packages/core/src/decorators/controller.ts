import { Router } from "express";
import "reflect-metadata";
import { IRequestMetadata } from "../@types/request";
import createRouter from "../helpers/createRouter";
import { RequestKey } from "./keys";

export function Controller(path: string) {
  return function Controller<T extends { new (...args: any[]): {} }>(
    constructor: T
  ) {
    const target = constructor.prototype;
    const requests: IRequestMetadata[] = Reflect.getOwnMetadata(
      RequestKey,
      target
    );

    return class extends constructor {
      public router: Router = Router();

      constructor(...args: any[]) {
        super(...args);

        requests.forEach((request) => {
          createRouter(this.router, request, target, this);
        });
      }
    };
  };
}
