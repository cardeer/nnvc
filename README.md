This library only supports TypeScript.

---

### Installation

Using npm

```bash
npm install nnvc
```

Using yarn

```bash
yarn add nnvc
```

---

### Basic Usage

Add this script in your package.json

```json
{
  "dev": "nodemon --watch src --ext ts,json --exec 'ts-node src/index.ts'"
}
```

Creating a server

```ts
import { Server } from 'nnvc/server'

class ApplicationServer extends Server {
  protected port: number = 3000

  constructor() {
    super()
  }
}

const app = new ApplicationServer()
app.start()
```

Now, let's create a controller

```ts
import { IncomingHttpHeaders } from 'http'
import { Controller, Get, Status } from 'nnvc'

@Controller('/')
export class IndexController {
  @Get('/ping')
  @Status(200)
  public async ping() {
    return {
      msg: 'pong',
    }
  }
}
```

After creating a controller, you have to register it in the server

```ts
class ApplicationServer extends Server {
  protected port: number = 3000

  constructor() {
    super()

    this.register(IndexController)
  }
}
```
