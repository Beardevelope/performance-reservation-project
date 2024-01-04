import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    // jwtService 사용하기위한 import 설정
    JwtModule.registerAsync({
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [PassportModule, TypeOrmModule.forFeature([User]), JwtStrategy],
})
export class UserModule {}
