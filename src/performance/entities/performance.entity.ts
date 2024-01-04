import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  image: string;

  @Column()
  content: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.performance, {
    cascade: true,
  })
  schedule: Schedule[];

  @ManyToOne((type) => User, (user) => user.performance)
  user: User;
}
