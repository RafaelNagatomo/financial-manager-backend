import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import router from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryRoutes from './routes/categoryRoutes';
import goalRoutes from './routes/goalRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const configureMiddlewares = (app: express.Application) => {
  app.use(cors());
  app.use(express.json());

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
};

const configureRoutes = (app: express.Application) => {
  app.use('/auth', router);
  app.use('/transactions', authMiddleware, transactionRoutes);
  app.use('/categories', authMiddleware, categoryRoutes);
  app.use('/goals', authMiddleware, goalRoutes);
};

const configureErrorHandling = (app: express.Application) => {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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
