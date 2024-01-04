import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  NotAcceptableException,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req) {
    const user = req.user;
    if (user.role === 'admin') {
      throw new NotAcceptableException('관계자는 예약하실 수 없습니다.');
    }
    return await this.reservationService.create(createReservationDto, user);
  }

  @Get('get')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() req) {
    const user = req.user;
    return this.reservationService.findAllByUserId(user.id);
  }
}
