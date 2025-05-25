import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpdateTenantDto } from "../dto/update-tenant.dto";
import { Tenant } from "../models";

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant)
    private readonly tenant: typeof Tenant,
  ) {}

  create(name: string) {
    return this.tenant.create({ name });
  }

  findOne(id: string) {
    return this.tenant.findByPk(id);
  }

  async update(tenantId: string, updateTenantDto: UpdateTenantDto) {
    const [rowsUpdated, [updatedTenant]] = await this.tenant.update(updateTenantDto, {
      where: { tenantId },
      returning: true,
    });

    if (rowsUpdated === 0) {
      throw new Error(`Tenant with id ${tenantId} not found`);
    }
    return updatedTenant;
  }

  async remove(id: string) {
    const rowsDeleted = await this.tenant.destroy({
      where: { tenantId: id },
    });

    if (rowsDeleted === 0) {
      throw new NotFoundException(`Tenant with id ${id} not found`);
    }
    return { message: `Tenant with id ${id} deleted successfully` };
  }
}
