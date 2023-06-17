import { SetMetadata, applyDecorators } from "@nestjs/common"

export const jwtAuthorize = ()=>{
    return SetMetadata('authorize', true)
}