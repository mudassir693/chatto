const redisNamingConvention = {
    AUTH: 'auth_',
}


export const redisAuthUser = (id: any)=>{
    return `${redisNamingConvention.AUTH+id}`
}