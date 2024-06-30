import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const registerService = async (firstName: string, lastName: string, email: string, password: string): Promise<User> => {

  const existingUser = await prisma.user.findUnique({ where: { email }})
  if (existingUser) {
    throw new Error('E-mail already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword
    }
  });
  return newUser;
};

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user) {
    throw new Error('Invalid e-mail');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '4h' });
  return token;
};
