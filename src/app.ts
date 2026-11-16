import express from 'express';
import taskRoutes from './routes/task.routes';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;