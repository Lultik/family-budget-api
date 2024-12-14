import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBudgetRecordDto {
  @IsNumber()
  @IsNotEmpty()
  readonly value: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDateString()
  @IsOptional()
  readonly timestamp?: string;

  @IsString()
  @IsOptional()
  readonly createdBy?: string;

  @IsNumber()
  @IsOptional()
  readonly discount?: number;

  @IsDateString()
  @IsOptional()
  readonly deletedAt?: Date;
}
