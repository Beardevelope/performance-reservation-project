import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, name, password, role } = createUserDto;

    const hasEmail = await this.findByEmail(email);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일 입니다.');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;
    newUser.role = role;

    await this.repository.save(newUser);
    // newUser.password = undefined; / 해당은 비밀번호를 클라이언트에게 반환 전 숨기기 위해 기능 추가를 해보았으나, 이해가 되지않음. return 전에 undefined로 처리해버린다면, 정보 자체가 undefined로 들어갈 것 이라고 생각되고있으나. chatGPT에서는 괜찮다고 하여 이해가 안되는 부분입니다.
    console.log(newUser);

    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('해당 유저는 존재하지 않습니다.');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }
    const token = this.jwtService.sign({ email: user.email });
    return { token, user };
  }

  async findById(id: number) {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async updateUserStatus() {}

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }
}
