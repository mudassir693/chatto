import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { OrmModule } from "src/orm/orm.module";
import { JwtModule } from "@nestjs/jwt";
import { RedisModule } from "src/cache/redis.module";

@Module({
    imports: [OrmModule, RedisModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule{}