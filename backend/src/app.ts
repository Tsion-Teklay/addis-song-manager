import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { env } from './config/env.js';

export function createApp(): Application {
  const app = express();

  app.use(cors({ origin: env.clientOrigin }));
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  return app;
}