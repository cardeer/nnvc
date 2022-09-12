import { Body, Controller, Get, Param, Post, Query } from "nnvc2";
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
      message,
      message2,
      query,
    };
  }

  @Post("/test-body")
  public async testPost(@Body body: any) {
    return body;
  }
}
