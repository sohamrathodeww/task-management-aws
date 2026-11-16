import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ success: false, message: 'Route not found' });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  if (err instanceof ValidationError) {
    res.status(400).json({ success: false, message: err.errors.map((e) => e.message).join(', ') });
    return;
  }
  if (err instanceof SyntaxError) {
    res.status(400).json({ success: false, message: 'Invalid JSON body' });
    return;
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
}