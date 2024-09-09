import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const registerService = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<any> => {

  const existingUser = await prisma.user.findUnique({ where: { email }})
  if (existingUser) {
    throw new Error('emailAlreadyExists');
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
  const { password: _, ...registeredUser } = newUser
  return registeredUser;
};

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email }});
  if (!user) {
    throw new Error('invalidEmail');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('invalidPassword');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '4h' });
  const { password: _, ...userLogin } = user
  return { token, userLogin }
};

export const getProfileService = async (token: string): Promise<User | null> => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASS ?? '') as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    return user;
  } catch (error) {
    throw new Error('invalidOrExpiredToken');
  }
};

export const editUserService = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
): Promise<any> => {
  try {
    const editUser = await prisma.user.update({
      where: { id: userId },
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
      }
    });
    const { password: _, ...editedUser } = editUser
    return editedUser;
  } catch (error) {
    return null;
  }
};