import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: '이메일을 입력해주세요' })
  @IsString({ message: '이메일을 잘못 입력했습니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @IsString({ message: '패스워드를 잘못 입력했습니다.' })
  password: string;
}
