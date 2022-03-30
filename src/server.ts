import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import { AppDataSource } from "./database";
import { router } from "./routes";

AppDataSource.initialize()
  .then(() => {
    const swaggerFile = YAML.load(`${__dirname}/swagger.yaml`);

    const app = express();

    app.use(express.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(router);

    app.listen(3333, () => console.log("Server is running!"));
  })
  .catch((error) => console.log(error));
