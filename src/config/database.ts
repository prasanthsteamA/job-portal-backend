import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Job } from '../models/Job';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Job],
  synchronize: true,
});
