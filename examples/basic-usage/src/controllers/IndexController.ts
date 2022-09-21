import { Body, Controller, Get, Param, Post, Query, Status, View } from "nnvc2";
import { DB } from "nnvc2/database";

@Controller("/api")
export class IndexController {
  @Get("/ping/:message/:message2")
  @Status(200)
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

  @Get("/test-page")
  @Status(200)
  @View({
    page: "index",
  })
  public async testPage() {
    return {
      message: "hello, world",
    };
  }

  @Get("/dis")
  public async getDis() {
    return "dis";
  }
}
