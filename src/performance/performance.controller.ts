import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from 'src/user/types/userRole';
import { AuthGuard } from '@nestjs/passport';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Post('post')
  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  async create(@Body() createPerformanceDto: CreatePerformanceDto, @Req() req) {
    const user = req.user;
    if (user.role !== Role.Admin) {
      throw new UnauthorizedException(
        ' Admin이 아니면 공연 등록을 할 수 없습니다.',
      );
    }

    return await this.performanceService.create(createPerformanceDto, user);
  }

  @Get('get')
  async findAll() {
    return this.performanceService.findAll();
  }

  @Get()
  async findByKeyword(@Query() keyword: string) {
    return this.performanceService.findByKeyword(keyword);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.performanceService.findOne(+id);
  }
}
