import express from 'express';
import router from './routes/authRoutes';
import transactionRoutes from './routes/transactionRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', router);
app.use('/transaction', transactionRoutes);
app.use('/category', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
