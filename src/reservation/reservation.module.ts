import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from '../user/entities/user.entity';
import { Performance } from 'src/performance/entities/performance.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([Reservation, Performance, User, Schedule]),
  ],

  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [PassportModule, TypeOrmModule.forFeature([Reservation])],
})
export class ReservationModule {}
