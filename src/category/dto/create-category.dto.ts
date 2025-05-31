import { CategoryDto } from "./category.dto";

export class CreateCategoryDto extends CategoryDto {
  constructor(name: string) {
    super();
    this.name = name;
  }
}
