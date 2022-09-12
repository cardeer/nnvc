import { RequestParams } from "../../@types/request";
import { IRequestParam } from "../../@types/param";
import { Request } from "express";

export default function bindRequestParams(
  paramsList: any[],
  paramsMeta: IRequestParam[],
  req: Request
) {
  if (paramsMeta) {
    paramsMeta.forEach((param) => {
      paramsList[param.index] = req.params[param.name];
    });
  }
}
