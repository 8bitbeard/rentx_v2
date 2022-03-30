import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx_database",
  synchronize: true,
  logging: true,
  entities: [Category, Specification],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
