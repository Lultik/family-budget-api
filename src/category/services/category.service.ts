import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly category: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.category.create(createCategoryDto);
  }

  findAll() {
    return this.category.findAll();
  }

  findOne(id: string) {
    return this.category.findByPk(id);
  }
}
