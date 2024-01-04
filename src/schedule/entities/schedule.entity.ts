import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Performance } from '../../performance/entities/performance.entity';
import { IsDateString } from 'class-validator';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  @Column()
  dateTime: Date;

  @Column()
  seat: number;

  @Column()
  availableSeat: number;

  @ManyToOne((type) => Performance, (performance) => performance.schedule)
  performance: Performance;

  @OneToMany((type) => Reservation, (reservation) => reservation.schedule)
  reservations: Reservation[];
}
