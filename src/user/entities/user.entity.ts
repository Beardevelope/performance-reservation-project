import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Entity,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../types/userRole';
import { Performance } from 'src/performance/entities/performance.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'int', default: 1000000 })
  points: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany((type) => Performance, (performance) => performance.user)
  performance: Performance[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
