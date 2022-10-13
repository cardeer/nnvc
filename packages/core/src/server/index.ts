import dotenv from 'dotenv'
import express from 'express'
import chalk from 'chalk'
import { Server as HttpServer } from 'http'
import initConnection from '@/database'
import { TemplateEngine } from '@/@types/server'
import setupLiquidJsTemplateEngine from './templateEngines/liquidjs'
import { IController } from '@/@types/controller'

dotenv.config()

export class Server {
  private _app: express.Application
  private _server: HttpServer | undefined

  protected port: number = 3000
  protected initDB: boolean = true
  protected templateEngine: TemplateEngine = 'liquidjs'

  constructor() {
    if (this.initDB) {
      initConnection()
    }

    this._app = express()

    switch (this.templateEngine) {
      case 'liquidjs':
        setupLiquidJsTemplateEngine(this._app)
        break
    }

    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))

    process.on('SIGINT', this.onStop)
    process.on('SIGTERM', this.onStop)
  }

  protected onStop() {
    this._server!.close((err) => {
      if (err) {
        console.log(chalk.red(`Error closing server: ${err.message}`))
      } else {
        console.log(chalk.red(`Server stopped`))
        this._server = undefined
      }
    })
  }

  public start() {
    this._server = this._app.listen(this.port, '0.0.0.0', () => {
      const server = chalk.green(`http://127.0.0.1:${this.port}`)
      console.log(`Server started on ${server}`)
    })
  }

  protected register<C>(controller: C) {
    const castedController = controller as {
      new (...args: any[]): IController
    }

    const controllerInstance = new castedController()

    this._app.use(controllerInstance.path, controllerInstance.router)
  }
}
