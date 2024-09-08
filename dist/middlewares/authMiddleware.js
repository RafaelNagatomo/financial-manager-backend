"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authService_1 = require("../services/authService");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'noTokenProvided' });
        }
        const token = authHeader.split(' ')[1];
        const user = await (0, authService_1.getProfileService)(token);
        if (!user) {
            return res.status(401).json({ error: 'invalidOrExpiredToken' });
        }
        const { password: _, ...loggedUser } = user;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: error.message || 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;
