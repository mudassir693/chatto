import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisService {
    @Inject(CACHE_MANAGER) private _cacheManager: Cache
    constructor(){}

    Set(key: string, value: any){
        this._cacheManager.set(key, value)
    }

    Get(key: string){
        return this._cacheManager.get(key)
    }

    Remove(key: string){
        this._cacheManager.del(key)
    }
}