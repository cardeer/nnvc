import { Request } from "express";

export default function bindRequestBody(
  paramsList: any[],
  bodyIndex: number,
  req: Request
) {
  paramsList[bodyIndex] = req.body;
}
