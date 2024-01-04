import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Performance } from './entities/performance.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly repository: Repository<Performance>,
  ) {}

  async create(createPerformanceDto: CreatePerformanceDto, user) {
    const {
      title,
      price,
      dateTimes,
      seats,
      availableSeats,
      location,
      image,
      content,
      category,
    } = createPerformanceDto;

    const userId = user.id;

    // [{datetime: 시간1}, {datetime:시간2} ] => mkDateTime]
    const dateTime = dateTimes.map((datetime) => {
      return { dateTime: new Date(datetime) };
    });

    const seat = seats.map((seat) => {
      return { seat };
    });

    // datetime / seat 합치기.

    const dateTimeAndSeat = dateTime.map((datetimes, index) => ({
      ...datetimes,
      ...seat[index],
    }));
    console.log(dateTimeAndSeat);
    const availableSeat = availableSeats.map((availableSeat) => {
      return { availableSeat };
    });
    // dateTimeAndSeat, availableSeat 합치기.

    const schedule = dateTimeAndSeat.map((dateTimeAndSeats, index) => ({
      ...dateTimeAndSeats,
      ...availableSeat[index],
    }));

    console.log(schedule);

    // create로 쓰면 왜 오류나는지 물어보기

    // 카테고리 집어넣어라 내일
    const newPerformance = await this.repository.save({
      user: userId,
      title,
      price,
      schedule: schedule,
      location,
      image,
      content,
      category,
    });
    return newPerformance;
  }

  async findAll() {
    const foundPerformance = await this.repository.find();
    return foundPerformance;
  }

  async findOne(id: number) {
    const foundPerformance = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        schedule: true,
      },
    });
    if (!foundPerformance) {
      throw new NotFoundException({
        message: '해당 공연은 존재하는 공연이 아닙니다.',
      });
    }

    return foundPerformance;
  }

  async findByKeyword(keyword: string) {
    try {
      const performances = await this.repository.find({
        where: {
          title: Like(`%${keyword}%`),
        },
      });

      if (!performances || performances.length === 0) {
        throw new NotFoundException({
          message: '검색 결과가 없습니다.',
        });
      }
      return performances;
    } catch (error) {
      console.error(' 찾을 수 없습니다. 아시겠습니까?', error.message);
      throw error;
    }
  }
}
