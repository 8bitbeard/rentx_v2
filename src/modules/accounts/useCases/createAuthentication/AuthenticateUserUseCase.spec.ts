import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate a valid user", async () => {
    const userData = {
      name: "Unit Test User",
      email: "unit_test@example.com",
      password: "123456",
      driver_license: "ABC1234",
    };

    await createUserUseCase.execute(userData);

    const result = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(result).toHaveProperty("token");
    expect(result.user.name).toEqual(userData.name);
    expect(result.user.email).toEqual(userData.email);
  });

  it("should not be able to authenticate an inexistent user", async () => {
    const userData = {
      email: "inexistent@example.com",
      password: "123456",
    };

    await expect(authenticateUserUseCase.execute(userData)).rejects.toEqual(
      new AppError("Email or password incorrect!")
    );
  });

  it("should not be able to authenticate with an invalid password", async () => {
    const userData = {
      name: "Unit Test User",
      email: "unit_test@example.com",
      password: "123456",
      driver_license: "ABC1234",
    };

    await createUserUseCase.execute(userData);

    await expect(
      authenticateUserUseCase.execute({
        email: userData.email,
        password: "invalid",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
