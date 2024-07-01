import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const registerService = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> => {

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

export const getProfileService = async (token: string): Promise<User | null> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};