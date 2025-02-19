import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column()
  title!: string;

  @Column()
  location!: string;

  @Column()
  type!: string;

  @Column()
  companyName!: string;

  @Column()
  description!: string;

  @Column()
  salaryRange!: string;

  @ManyToOne(() => User, (user) => user.id)
  postedBy!: User;
}
