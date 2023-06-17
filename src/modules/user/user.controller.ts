import { Body, Controller, Post, Get, Query, Param, Patch, Delete, Req, BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import { jwtAuthorize } from "src/auth/decorator/jwt.decorator";
import { Request } from "express";
import { CurrentUser } from "src/auth/decorator/current.user.decorator";
import { RedisService } from "src/cache/redis.service";
import { redisAuthUser } from "src/utills/redis.utills";

@Controller("/users")
export class UserController {
    constructor(private _userService: UserService, private _redisService: RedisService){}

    @jwtAuthorize()
    @Get('/')
    async userList(@Query() data: any, @Req() request: Request, @CurrentUser() user){
        console.log('okay: ',redisAuthUser(user.id))
        const redisAuth = await this._redisService.Get(redisAuthUser(user.id))
        if(user.email !== redisAuth){
            throw new BadRequestException()
        }
        return await this._userService.userList(data)
    }

    @Get('/:id')
    async findUnique(@Param("id") id: number){
        const data = {
            id: id
        }
        return await this._userService.findUnique(data)
    }

    @Patch('/:id')
    async Update(@Param('id') id: number, @Body() data: any): Promise<{Success: boolean}>{
        return await this._userService.update(data, id)
    }

    @Delete('/:id')
    async Delete(@Param('id') id: number): Promise<{Success: boolean}>{
        return await this._userService.delete(id)
    }

}