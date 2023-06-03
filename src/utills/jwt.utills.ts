import { JwtService } from '@nestjs/jwt';

export interface JwtAuthInterface {
    id: number,
    email: string,
}

export  function CreateAccessToken(data: JwtAuthInterface){
    let jwtService = new JwtService
    return jwtService.signAsync(data, {secret: process.env.JWT_SECRET})
}