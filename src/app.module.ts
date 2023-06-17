import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { OrmModule } from './orm/orm.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ApplicationGuard } from './auth/guards/application.guard';
import { JwtStrategy } from './strategies/jwt.passport';
import {CacheModule} from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { RedisService } from './cache/redis.service';
import { ConfigService } from '@nestjs/config';
// import { RedisModule } from './cache/redis.module';

@Module({
  imports: [
    DatabaseModule,
    OrmModule,
    JwtModule.register({}),
    CacheModule.register<RedisClientOptions>({
      isGlobal:true,
      ttl: 500000,
      store: redisStore.redisStore,
      host: 'localhost',
      port: 6379,
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    AppService,
    JwtStrategy,
    RedisService,
    {
      provide: APP_GUARD,
      useClass: ApplicationGuard,
    }
  ],
})
export class AppModule {}
