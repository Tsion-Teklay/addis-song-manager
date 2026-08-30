import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import songRoutes from './routes/song.routes.js';

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  app.use('/api/songs', songRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}