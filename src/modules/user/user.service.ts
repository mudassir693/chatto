import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { user } from "@prisma/client";
import { OrmService } from "src/orm/orm.service";


@Injectable()
export class UserService {
    constructor(private _ormService:OrmService<user>){
        _ormService.setTableName("user");
    }
    
    async create(data:any): Promise<{Success: boolean}>{
        const User = await this._ormService.create({
            name: 'test',
            email: 'data.email',
            password: 'data.password'
        })
        if(!User){
            throw new BadRequestException()
        }
        return {Success: true}
    }

    async userList(data): Promise<{Records: Array<user>, Count: number}>{
        const whereParams: any = {}
        if(data.orderBy){
            whereParams.orderBy = data.orderBy 
        }
        if(data.skip){
            whereParams.skip = parseInt(data.skip)
        }
        if(data.take){
            whereParams.take = parseInt(data.take)
        }
        return await this._ormService.findAll({
            where:{},
            skip: parseInt(data.skip),
            take: parseInt(data.take)
        })
    }

    async findUnique(data: any): Promise<user>{
        const whereParams: any = {}
        if(data.id){
            whereParams.id = parseInt(data.id)
        }else if(data.email){
            whereParams.email = data.email
        }
        const User = await this._ormService.findUnique(whereParams)
        if(!User){
            throw new NotFoundException()
        }
        return User
    }

    async update(data: any, id: any): Promise<{Success: boolean}>{
        const whereParams: any = {
            id: parseInt(id)
        }
        const User: user = await this._ormService.findUnique(whereParams)
        if(!User){
            throw new NotFoundException()
        }
        const UpdatedUser = await this._ormService.update(id, {
            ...(data.name && {name:data.name}),
            ...(data.email && {email: data.email}),
            ...(data.email && {password: data.password})
        })

        if(!UpdatedUser){
            throw new BadRequestException()
        }
        return {
            Success: true
        }
    }

    async delete(id: number): Promise<{Success: boolean}>{
        await this.findUnique({id})
        const isDeleted = this._ormService.delete(id)

        if(!isDeleted){
            throw new BadRequestException('')
        }
        return {
            Success:true
        }
    }    
}