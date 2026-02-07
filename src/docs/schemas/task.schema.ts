import type { OpenAPIV3 } from 'openapi-types';

/**
 * Task creation request schema
 */
export const createTaskSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
      description: 'Task title',
      example: 'Buy groceries',
    },
    notes: {
      type: 'string',
      description: 'Optional task notes',
      example: 'Milk, eggs, bread',
    },
    listType: {
      type: 'string',
      enum: ['inbox', 'today', 'upcoming', 'anytime', 'someday'],
      description: 'Which list the task belongs to',
      example: 'inbox',
    },
    scheduledDate: {
      type: 'string',
      format: 'date',
      description: 'Scheduled date (YYYY-MM-DD)',
      example: '2026-02-10',
    },
    scheduledTime: {
      type: 'string',
      format: 'time',
      description: 'Scheduled time (HH:MM:SS)',
      example: '14:30:00',
    },
  },
};

/**
 * Task response schema (full task object)
 */
export const taskSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 1,
    },
    title: {
      type: 'string',
      example: 'Buy groceries',
    },
    notes: {
      type: 'string',
      nullable: true,
      example: 'Milk, eggs, bread',
    },
    listType: {
      type: 'string',
      enum: ['inbox', 'today', 'upcoming', 'anytime', 'someday'],
      example: 'inbox',
    },
    status: {
      type: 'string',
      enum: ['pending', 'completed', 'deleted'],
      example: 'pending',
    },
    scheduledDate: {
      type: 'string',
      format: 'date',
      nullable: true,
      example: '2026-02-10',
    },
    scheduledTime: {
      type: 'string',
      format: 'time',
      nullable: true,
      example: '14:30:00',
    },
    isOverdue: {
      type: 'boolean',
      example: false,
    },
    position: {
      type: 'integer',
      example: 0,
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-02-06T14:30:00.000Z',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-02-06T14:30:00.000Z',
    },
    completedAt: {
      type: 'string',
      format: 'date-time',
      nullable: true,
      example: null,
    },
  },
};
