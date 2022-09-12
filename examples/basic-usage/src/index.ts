import { Server } from "nnvc2/server";
import { IndexController } from "./controllers/IndexController";

class ApplicationServer extends Server {
  protected port: number = 3000;

  constructor() {
    super();

    this.register(IndexController);
  }
}

const app = new ApplicationServer();
app.start();
