import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create Car", () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let createCarUseCase: CreateCarUseCase;
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const carData = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    };

    await createCarUseCase.execute(carData);

    const car = await carsRepositoryInMemory.findByLicensePlate(
      carData.license_plate
    );

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an already existing licence plate", async () => {
    const carData = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    };

    await createCarUseCase.execute(carData);

    await expect(createCarUseCase.execute(carData)).rejects.toEqual(
      new AppError("Car already exists!", 409)
    );
  });

  it("should be able to create a car with availabe true by default", async () => {
    const carData = {
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car Brand",
      category_id: "category",
    };

    await createCarUseCase.execute(carData);
    const car = await carsRepositoryInMemory.findByLicensePlate(
      carData.license_plate
    );

    expect(car.available).toBe(true);
  });
});
