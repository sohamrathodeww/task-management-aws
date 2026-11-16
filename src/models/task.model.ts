import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export const TASK_STATUSES = ['pending', 'in_progress', 'completed'] as const;
export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: CreationOptional<string | null>;
  declare status: CreationOptional<TaskStatus>;
  declare priority: CreationOptional<TaskPriority>;
  declare dueDate: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Task.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: {
      type: DataTypes.ENUM(...TASK_STATUSES),
      allowNull: false,
      defaultValue: 'pending',
    },
    priority: {
      type: DataTypes.ENUM(...TASK_PRIORITIES),
      allowNull: false,
      defaultValue: 'medium',
    },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, tableName: 'tasks' },
);