import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/createAuthentication/AuthenticateUserController";

// eslint-disable-next-line max-len

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/login", authenticateUserController.handle);

export { authenticateRoutes };
