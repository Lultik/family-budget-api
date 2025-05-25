import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";

export class GoogleGuard extends AuthGuard("google") {
  constructor(private configService: ConfigService) {
    super({
      accessType: "offline",
    });
  }
}
