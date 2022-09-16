import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";
import { Server as HttpServer } from "http";
import initConnection from "../database";
import { TemplateEngine } from "../@types/server";
import setupLiquidJsTemplateEngine from "./templateEngines/liquidjs";

dotenv.config();

export class Server {
  private _app: express.Application;
  private _server: HttpServer | null = null;
  protected port: number = 3000;
  protected initDB: boolean = true;

  protected templateEngine: TemplateEngine = "liquidjs";

  constructor() {
    if (this.initDB) {
      initConnection();
    }

    this._app = express();

    if (this.templateEngine === "liquidjs") {
      setupLiquidJsTemplateEngine(this._app);
    }

    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));

    process.on("SIGINT", this.onStop);
  }

  protected onStop() {
    this._server?.close((err) => {
      if (err) {
        console.log(chalk.red(`Error closing server: ${err.message}`));
      } else {
        console.log(chalk.red(`Server stopped`));
      }
    });
  }

  public start() {
    this._server = this._app.listen(this.port, "0.0.0.0", () => {
      const server = chalk.green(`http://127.0.0.1:${this.port}`);
      console.log(`Server started on ${server}`);
    });
  }

  protected register(controller: any) {
    this._app.use(new controller().router!);
  }
}
