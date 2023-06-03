import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginRequest, UserSignUpRequest } from "./dto/request.dto";

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService){}

    @Post('/signup')
    async signup(@Body() body:UserSignUpRequest){
        return await this._authService.signup(body)
    }

    @Post('/login')
    async login(@Body() body: UserLoginRequest){
        return this._authService.login(body)   
    }
}