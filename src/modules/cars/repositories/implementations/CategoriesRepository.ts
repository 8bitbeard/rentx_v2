import { Repository } from "typeorm";

import { Category } from "@modules/cars/entities/Category";

import { AppDataSource } from "../../../../database";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: {
        name,
      },
    });

    return category;
  }
}

export { CategoriesRepository };
