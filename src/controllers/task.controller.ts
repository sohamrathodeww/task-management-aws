import { Request, Response } from 'express';
import { Task, TASK_PRIORITIES, TASK_STATUSES } from '../models/task.model';
import { AppError } from '../middlewares/error.middleware';

function parseId(raw: string | string[] | undefined): number {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) throw new AppError(400, 'Invalid task id');
  return id;
}

function validateBody(body: any, partial: boolean) {
  if (typeof body !== 'object' || body === null) throw new AppError(400, 'Body is required');
  const data: Record<string, unknown> = {};

  if (body.title !== undefined || !partial) {
    if (typeof body.title !== 'string' || body.title.trim() === '' || body.title.length > 150) {
      throw new AppError(400, 'title is required (1-150 characters)');
    }
    data.title = body.title.trim();
  }
  if (body.description !== undefined) {
    if (body.description !== null && typeof body.description !== 'string') {
      throw new AppError(400, 'description must be a string or null');
    }
    data.description = body.description;
  }
  if (body.status !== undefined) {
    if (!TASK_STATUSES.includes(body.status)) {
      throw new AppError(400, `status must be one of: ${TASK_STATUSES.join(', ')}`);
    }
    data.status = body.status;
  }
  if (body.priority !== undefined) {
    if (!TASK_PRIORITIES.includes(body.priority)) {
      throw new AppError(400, `priority must be one of: ${TASK_PRIORITIES.join(', ')}`);
    }
    data.priority = body.priority;
  }
  if (body.dueDate !== undefined) {
    if (body.dueDate === null) {
      data.dueDate = null;
    } else {
      const d = new Date(body.dueDate);
      if (Number.isNaN(d.getTime())) throw new AppError(400, 'dueDate must be a valid date');
      data.dueDate = d;
    }
  }
  return data;
}

export async function createTask(req: Request, res: Response) {
  const data = validateBody(req.body, false) as any;
  const task = await Task.create(data);
  res.status(201).json({ success: true, data: task });
}

export async function getTasks(req: Request, res: Response) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

  const where: Record<string, unknown> = {};
  if (req.query.status !== undefined) {
    if (!TASK_STATUSES.includes(req.query.status as any)) {
      throw new AppError(400, `status must be one of: ${TASK_STATUSES.join(', ')}`);
    }
    where.status = req.query.status;
  }
  if (req.query.priority !== undefined) {
    if (!TASK_PRIORITIES.includes(req.query.priority as any)) {
      throw new AppError(400, `priority must be one of: ${TASK_PRIORITIES.join(', ')}`);
    }
    where.priority = req.query.priority;
  }

  const { rows, count } = await Task.findAndCountAll({
    where,
    limit,
    offset: (page - 1) * limit,
    order: [['id', 'DESC']],
  });

  res.json({
    success: true,
    data: rows,
    meta: { page, limit, total: count, totalPages: Math.ceil(count / limit) },
  });
}

export async function getTaskById(req: Request, res: Response) {
  const task = await Task.findByPk(parseId(req.params.id));
  if (!task) throw new AppError(404, 'Task not found');
  res.json({ success: true, data: task });
}

export async function updateTask(req: Request, res: Response) {
  const task = await Task.findByPk(parseId(req.params.id));
  if (!task) throw new AppError(404, 'Task not found');
  const data = validateBody(req.body, true) as any;
  await task.update(data);
  res.json({ success: true, data: task });
}

export async function deleteTask(req: Request, res: Response) {
  const task = await Task.findByPk(parseId(req.params.id));
  if (!task) throw new AppError(404, 'Task not found');
  await task.destroy();
  res.json({ success: true, message: 'Task deleted' });
}