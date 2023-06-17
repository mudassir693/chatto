import { BadRequestException, Injectable } from "@nestjs/common";
import { user } from "@prisma/client";
import { OrmService } from "src/orm/orm.service";
import { CreateAccessToken } from "src/utills/jwt.utills";
import { UserLoginRequest, UserSignUpRequest } from "./dto/request.dto";
import { RedisService } from "src/cache/redis.service";
import { redisAuthUser } from "src/utills/redis.utills";


@Injectable()
export class AuthService {
    constructor(private _ormService: OrmService<user>, private _cacheService: RedisService ){
        this._ormService.setTableName('user')
    }

    async signup(data: UserSignUpRequest): Promise<any>{
        const User: user = await this._ormService.findFirst({email: data.email})

        if(User){
            throw new BadRequestException('User with this email is already registered')
        }

        const CreateUser = await this._ormService.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        const token = await CreateAccessToken({
            id: CreateUser.id,
            email: CreateUser.email
        })

        await this._cacheService.Set(redisAuthUser(CreateUser.id), CreateUser.email)
        
        return {
            AccessToken: token
        }
    }

    async login(data: UserLoginRequest): Promise<{AccessToken}>{
        const User: user = await this._ormService.findFirst({email: data.email})

        if(!User){
            throw new BadRequestException('User not found')
        }

        const AccessToken  = await CreateAccessToken({
            id: User.id,
            email: User.email
        })

        return {
            AccessToken: AccessToken
        }
    }
}