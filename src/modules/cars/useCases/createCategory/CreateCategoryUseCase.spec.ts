import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create Category", () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const categoryData = {
      name: "Unit Test Category",
      description: "Unit Test Description",
    };
    await createCategoryUseCase.execute(categoryData);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      categoryData.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a new category with an already used name", async () => {
    const categoryData = {
      name: "Unit Test Category",
      description: "Unit Test Description",
    };
    await createCategoryUseCase.execute(categoryData);
    await expect(createCategoryUseCase.execute(categoryData)).rejects.toEqual(
      new AppError("Category already exists!")
    );
  });
});
