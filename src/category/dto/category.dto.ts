import { ApiProperty } from "@nestjs/swagger";
import { ICategory } from "../interfaces/category.interface";

export class CategoryDto implements ICategory {
  @ApiProperty({
    description: "Category id",
    required: true,
    example: "f38b5d21-636e-4ca1-925f-04ec953a0bdc",
  })
  id: string;

  @ApiProperty({
    description: "User Name",
    required: true,
    example: "My Family",
  })
  name: string;
}
