import { Request } from "express";

export default function bindRequestQueries(
  paramsList: any[],
  queryIndex: number,
  req: Request
) {
  paramsList[queryIndex] = req.query;
}
