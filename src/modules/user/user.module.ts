import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { OrmModule } from "src/orm/orm.module";

@Module({
    imports:[OrmModule],
    providers:[UserService],
    controllers:[UserController],
})
export class UserModule {}