import { User } from 'src/user/entities/user.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @JoinColumn()
  @ManyToOne(() => Schedule, (schedule) => schedule.reservations)
  schedule: Schedule;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  scheduleId: number;

  @Column()
  userId: number;
}
