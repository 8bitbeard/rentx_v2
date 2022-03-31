import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { AppDataSource } from "./database";
import "./shared/container";
import { router } from "./routes";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const swaggerFile = YAML.load(`${__dirname}/swagger.yaml`);

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
