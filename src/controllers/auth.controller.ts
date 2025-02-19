import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {    
    const userRepo = AppDataSource.getRepository(User);
    const { email, password, name } = req.body;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ email, password: hashedPassword, name });
    await userRepo.save(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userId: user.id
    });  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
