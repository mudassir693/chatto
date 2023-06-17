import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { OrmModule } from "src/orm/orm.module";
import { RedisModule } from "src/cache/redis.module";

@Module({
    imports:[OrmModule, RedisModule],
    providers:[UserService],
    controllers:[UserController],
})
export class UserModule {}