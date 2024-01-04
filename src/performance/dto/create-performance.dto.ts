import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreatePerformanceDto {
  @IsString({ message: '형식에 맞지 않는 타입입니다.' })
  @IsNotEmpty({ message: '공연의 타이틀은 필수 입력 항목입니다.' })
  title: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연의 가격은 필수 입력 항목입니다.' })
  price: number;

  // @IsDateString({}, { each: true })
  @IsNotEmpty({ message: '공연 날짜는 필수 입력 항목입니다.' })
  dateTimes: Date[];

  @IsNotEmpty()
  @IsNumber()
  seats: number[];

  @IsNotEmpty()
  @IsNumber()
  availableSeats: number[];

  @IsString({ message: '형식에 맞지 않는 타입입니다.' })
  @IsNotEmpty({ message: 'locate는 필수 입력 사항입니다.' })
  location: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
