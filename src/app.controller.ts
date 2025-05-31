import { Controller, Get } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { Public } from "./auth/decorators";

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get("info")
  info(): string {
    return JSON.stringify(this.appService.info());
  }
}
