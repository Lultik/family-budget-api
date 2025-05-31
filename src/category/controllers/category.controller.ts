import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../../auth/guards";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { CategoryService } from "../services/category.service";

@UseGuards(JwtGuard)
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }
}
