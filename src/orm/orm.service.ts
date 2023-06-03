import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class OrmService<T>{
    private _table = null
    constructor(private _db: DatabaseService) {}

    setTableName(tableName: string){
        this._table = tableName;
    }

    async create(data: T | any){
        return await this._db[this._table].create({data})
    }

    async findAll(whereParams?: any){
        // for pagination apis
        // skip
        // take
        // orderBy
        const Records = await this._db[this._table].findMany(whereParams)
        const Count = await this._db[this._table].count(whereParams.where)
        return {
            Records,
            Count
        }
    }

    async update(id: number|any, data: T | any){
        return await this._db[this._table].update({
            where:{id:parseInt(id)},
            data
        })
    }

    async findUnique(whereParams: any): Promise<T>{
        return await this._db[this._table].findUnique({where:whereParams})
    }

    async findFirst(whereParams: any): Promise<T>{
        return await this._db[this._table].findFirst({where:whereParams})
    }

    async delete(id: number|any){
        return await this._db[this._table].delete({where:{id: parseInt(id)}})
    }

    async deleteMany(id: number){
        return await this._db[this._table].deleteMany({where:{id: id}})
    }
}