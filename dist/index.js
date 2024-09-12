"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const configureMiddlewares = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
};
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const configureRoutes = (app) => {
    app.use('/auth', authRoutes_1.default);
    app.use('/transactions', authMiddleware_1.authMiddleware, transactionRoutes_1.default);
    app.use('/categories', authMiddleware_1.authMiddleware, categoryRoutes_1.default);
    app.use('/goals', authMiddleware_1.authMiddleware, goalRoutes_1.default);
};
const configureErrorHandling = (app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    });
};
const startServer = () => {
    configureMiddlewares(app);
    configureRoutes(app);
    configureErrorHandling(app);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();
