import { Controller, Get, Param, Query } from "nnvc2";
import { DB } from "nnvc2/database";

@Controller("/")
export class IndexController {
  @Get("/ping/:message/:message2")
  public async ping(
    @Param("message2") message2: string,
    @Param("message") message: string,
    @Query query: any[]
  ) {
    return {
      msg: "pong " + message + " and message 2 is " + message2,
      query,
    };
  }
}
