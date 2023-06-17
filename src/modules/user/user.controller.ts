import { Body, Controller, Post, Get, Query, Param, Patch, Delete, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { jwtAuthorize } from "src/auth/decorator/jwt.decorator";
import { Request } from "express";

@Controller("/users")
export class UserController {
    constructor(private _userService: UserService){}

    @jwtAuthorize()
    @Get('/')
    async userList(@Query() data: any, @Req() request: Request){
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