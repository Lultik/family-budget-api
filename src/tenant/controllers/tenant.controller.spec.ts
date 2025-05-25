import { Test, type TestingModule } from "@nestjs/testing";
import { TenantService } from "../service/tenant.service";
import { TenantController } from "./tenant.controller";

describe("TenantController", () => {
  let controller: TenantController;

  const mockTenantService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useValue: mockTenantService,
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call create method of TenantService", async () => {
    const name = "Test Tenant";
    await controller.create({ tenantId: "", name });
    expect(mockTenantService.create).toHaveBeenCalledWith(name);
  });

  it("should call findOne method of TenantService", async () => {
    const id = "1";
    await controller.findOne(id);
    expect(mockTenantService.findOne).toHaveBeenCalledWith(id);
  });

  it("should call update method of TenantService", async () => {
    const id = "1";
    const updateTenantDto = { name: "Updated Tenant" };
    await controller.update(id, updateTenantDto);
    expect(mockTenantService.update).toHaveBeenCalledWith(+id, updateTenantDto);
  });

  it("should call remove method of TenantService", async () => {
    const id = "1";
    await controller.remove(id);
    expect(mockTenantService.remove).toHaveBeenCalledWith(+id);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
