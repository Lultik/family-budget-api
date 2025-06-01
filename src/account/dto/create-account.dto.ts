import { PickType } from "@nestjs/swagger";
import { AccountDto } from "./account.dto";

export class CreateAccountDto extends PickType(AccountDto, ["name", "type", "currency", "userId"]) {}
