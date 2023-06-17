import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ApplicationGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext){
        const authorize = this.reflector.get('authorize',context.getHandler())
        if (!authorize) return true;
        return super.canActivate(context);
    }

}
