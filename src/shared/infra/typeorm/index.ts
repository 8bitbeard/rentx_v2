import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import "reflect-metadata";

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "rentx_database",
  synchronize: true,
  logging: true,
  entities: [Category, Specification, User],
  subscribers: [],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
});
