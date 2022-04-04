import "dotenv/config";
import { hash } from "bcryptjs";
import crypto from "crypto";

import { AppDataSource } from "@shared/infra/typeorm";

async function create() {
  const id = crypto.randomUUID();
  const password = await hash("admin", 8);

  AppDataSource.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'ABC123DEF')`
  );
}

AppDataSource.initialize()
  .then(() => {
    create().then(() => {
      console.log("User admin created!");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
