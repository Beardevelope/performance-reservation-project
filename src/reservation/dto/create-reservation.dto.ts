import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty({ message: '입력란을 확인 해주세요.' })
  scheduleId: number;
}
