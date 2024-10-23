import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const users = [{ username: 'mestre', password: 'senha123' }]; // Simulação de banco de dados

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

  return res.json({ token });
};
