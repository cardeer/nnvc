import { Server } from 'nnvc/server'
import { IndexController } from './controllers/IndexController'

class ApplicationServer extends Server {
  protected port: number = 3000
  protected initDB: boolean = false

  constructor() {
    super()

    this.register(IndexController)
  }
}

const app = new ApplicationServer()
app.start()
