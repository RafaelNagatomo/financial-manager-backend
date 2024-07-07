import express from 'express';
import cors from 'cors';

import router from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryRoutes from './routes/categoryRoutes';
import goalRoutes from './routes/goalRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());

app.use('/auth', router);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);
app.use('/goals', goalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
