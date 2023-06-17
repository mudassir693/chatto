import { createParamDecorator } from '@nestjs/common';
import { RedisService } from 'src/cache/redis.service';
import { redisAuthUser } from 'src/utills/redis.utills';

export const CurrentUser = createParamDecorator(function (data, context){
  const request = context.switchToHttp().getRequest();
  return request.user ? request.user : null;
});
