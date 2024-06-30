import express from 'express';
import router from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
