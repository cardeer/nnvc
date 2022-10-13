import { IncomingHttpHeaders } from 'http'
import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Status,
  View,
} from 'nnvc'
import { DB } from 'nnvc/database'

@Controller('/api')
export class IndexController {
  @Get('/ping')
  @Status(200)
  public async normalPing(@Header('user-agent') agent: string) {
    return {
      userAgent: agent,
    }
  }

  @Get('/ping/:message/:message2')
  @Status(200)
  public async ping(
    @Param('message2') message2: string,
    @Param('message') message: string,
    @Query query: any[]
  ) {
    return {
      message,
      message2,
      query,
    }
  }

  @Post('/test-body')
  public async testPost(@Body body: any) {
    return body
  }

  @Get('/test-page')
  @Status(200)
  @View({
    page: 'index',
  })
  public async testPage() {
    return {
      message: 'hello, world',
    }
  }

  @Get('/dis')
  public async getDis() {
    return 'dis'
  }
}
