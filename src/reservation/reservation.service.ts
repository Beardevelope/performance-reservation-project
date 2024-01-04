import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Performance } from '../performance/entities/performance.entity';
import { User } from '../User/entities/user.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Performance)
    private readonly performanceRepository: Repository<Performance>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  /** 예약 생성
   *
   */
  async create(createReservationDto: CreateReservationDto, user) {
    const { scheduleId } = createReservationDto;

    // 예약시 포인트 차감 logic
    //22번줄에서 req한 user의 포인트 재 정의
    const userPoint = user.points;

    //(2) repository에서 이용요금을 확인.
    const performance = await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
      },
      relations: {
        performance: true,
      },
    });
    //(2) performancePrice에 대한 부분을 재정의
    const performancePrice = performance.performance.price;

    // (3) 유저 포인트에서 - 공연 가격을 뺀 유저의 포인트를 정의
    const payPoint = userPoint - performancePrice;

    // (4) (보유 포인트 - 공연 가격) = 의 값을 User DB에 업데이트(저장)하는 함수.
    await this.userRepository.update({ id: user.id }, { points: payPoint });

    // availableSeat의 수가 1개 줄어야함.
    const reducedSeat = performance.availableSeat - 1;

    // 예매시 감소한 시트 좌석을 schedule DB에 업데이트(저장)
    await this.scheduleRepository.update(
      { id: scheduleId },
      { availableSeat: reducedSeat },
    );

    const newReservation = await this.reservationRepository.save({
      scheduleId, // userId: user.id,
      userId: user.id,
    });
    return {
      newReservation,
      dateTime: performance.dateTime,
      locate: performance.performance.location,
      price: performance.performance.price,
    };
  }

  async findAllByUserId(userId: number) {
    const foundReservations = await this.reservationRepository.find({
      where: {
        userId,
      },
      relations: {
        schedule: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!foundReservations || foundReservations.length === 0) {
      throw new NotFoundException('사용자의 예약이 존재하지 않습니다.');
    }
    return foundReservations;
  }
}
