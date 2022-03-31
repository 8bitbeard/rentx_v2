import { Router } from "express";

// eslint-disable-next-line max-len
import { AuthenticateUserController } from "../modules/accounts/useCases/createAuthentication/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/login", authenticateUserController.handle);

export { authenticateRoutes };
