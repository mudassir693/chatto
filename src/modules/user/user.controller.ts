import { Body, Controller, Post, Get, Query, Param, Patch, Delete } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
    constructor(private _userService: UserService){}

    @Post('/')
    async CreateUser(@Body() body: any): Promise<{Success: boolean}>{
        return await this._userService.create(body)
    }

    @Get('/')
    async userList(@Query() data: any){
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