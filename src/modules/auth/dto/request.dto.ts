import { Length } from "class-validator";

export class UserSignUpRequest {
    @Length(1)
    name: string

    @Length(1)
    email: string

    @Length(1)
    password: string
}

export class UserLoginRequest {
    @Length(1)
    email: string

    @Length(1)
    password: string
}