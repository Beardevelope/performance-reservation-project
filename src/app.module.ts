import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PerformanceModule } from './performance/performance.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ReservationModule } from './reservation/reservation.module';
import { PassportModule } from '@nestjs/passport';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    // autoloadEntities - 엔티티 추가 입력X 자동으로 추가해줌.
    autoLoadEntities: true,
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: configService.get('DB_SYNC'),
    logging: false,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    PerformanceModule,
    // confitgModule을 전역으로 사용가능. isGlobal
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
