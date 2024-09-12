"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = exports.editUserService = exports.getProfileService = exports.loginService = exports.registerService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerService = async (firstName, lastName, email, password) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('emailAlreadyExists');
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword
        }
    });
    const { password: _, ...registeredUser } = newUser;
    return registeredUser;
};
exports.registerService = registerService;
const loginService = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('invalidEmail');
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('invalidPassword');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '4h' });
    const { password: _, ...userLogin } = user;
    return { token, userLogin };
};
exports.loginService = loginService;
const getProfileService = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS ?? '');
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        return user;
    }
    catch (error) {
        throw new Error('invalidOrExpiredToken');
    }
};
exports.getProfileService = getProfileService;
const editUserService = async (userId, firstName, lastName, email) => {
    try {
        const editUser = await prisma.user.update({
            where: { id: userId },
            data: {
                first_name: firstName,
                last_name: lastName,
                email,
            }
        });
        const { password: _, ...editedUser } = editUser;
        return editedUser;
    }
    catch (error) {
        return null;
    }
    ;
};
exports.editUserService = editUserService;
const changePasswordService = async (userId, currentPassword, newPassword) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('A senha atual está incorreta.');
        }
        const hashedNewPassword = await bcryptjs_1.default.hash(newPassword, 10);
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedNewPassword,
            }
        });
        const { password: _, ...editedPass } = updatedUser;
        return editedPass;
    }
    catch (error) {
        console.error('Erro ao alterar a senha:', error);
        throw new Error('Não foi possível alterar a senha.');
    }
};
exports.changePasswordService = changePasswordService;
