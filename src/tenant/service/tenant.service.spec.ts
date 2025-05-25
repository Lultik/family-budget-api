import { Test, type TestingModule } from "@nestjs/testing";
import { TenantService } from "./tenant.service";

describe("TenantService", () => {
  let service: TenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: TenantService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
