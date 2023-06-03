import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    DatabaseModule,
    OrmModule,
    JwtModule.register({}),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ApplicationGuard,
    }
  ],
})
export class AppModule {}
