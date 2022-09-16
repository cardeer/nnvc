import { Application } from "express";
import { Liquid } from "liquidjs";
import path from "path";

const engine = new Liquid({
  cache: process.env.NODE_ENV === "production",
});

export default function setupLiquidJsTemplateEngine(app: Application) {
  app.engine("liquid", engine.express());
  app.set("views", path.resolve("src/views"));
  app.set("view engine", "liquid");
}
