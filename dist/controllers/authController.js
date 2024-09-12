"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.changePassword = exports.editUser = exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const newUser = await (0, authService_1.registerService)(firstName, lastName, email, password);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await (0, authService_1.loginService)(email, password);
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const editUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    try {
        const editedUser = await (0, authService_1.editUserService)(userId, firstName, lastName, email);
        res.status(200).json(editedUser);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editUser = editUser;
const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    }
    if (!currentPassword || !newPassword) {
        res.status(400).json({ error: 'Both current and new passwords are required' });
        return;
    }
    try {
        const editedPass = await (0, authService_1.changePasswordService)(userId, currentPassword, newPassword);
        if (!editedPass) {
            res.status(400).json({ error: 'Failed to change password. Please check your current password.' });
            return;
        }
        res.status(200).json({ message: 'Password changed successfully', user: editedPass });
    }
    catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: error.message || 'Failed to change password.' });
    }
};
exports.changePassword = changePassword;
const getProfile = (req, res) => {
    res.status(200).json(req.user);
};
exports.getProfile = getProfile;
