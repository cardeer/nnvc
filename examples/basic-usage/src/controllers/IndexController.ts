import { Controller, Get, Param, Query } from "nnvc2";

@Controller("/")
export class IndexController {
  @Get("/ping/:message/:message2")
  public ping(
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
