import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { CreateTenantDto } from "../dto/create-tenant.dto";
import { UpdateTenantDto } from "../dto/update-tenant.dto";
import { TenantService } from "../service/tenant.service";

@Controller("tenant")
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto.name);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(":id")
  @HttpCode(204) // No Content
  remove(@Param("id") id: string) {
    return this.tenantService.remove(id);
  }
}
