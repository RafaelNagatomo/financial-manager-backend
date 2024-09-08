"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
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
        const { token, userLogin } = await (0, authService_1.loginService)(email, password);
        res.json({
            userLogin,
            token
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = login;
const getProfile = (req, res) => {
    if (!req.user) {
        return res.status(404).json({ error: 'userNotFound' });
    }
    res.json(req.user);
};
exports.getProfile = getProfile;
