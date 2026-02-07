/**
 * Input validation schemas: Use zod to validate request bodies
 * before they reach the controller. Right now your POST endpoint
 * accepts anything — validation would catch missing title,
 * invalid dates, etc.
 */

import { z } from 'zod';

// Matches the Prisma ListType enum
const listTypeEnum = z.enum(['inbox', 'today', 'upcoming', 'anytime', 'someday']);

// Validates: POST /api/v1/tasks
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be 255 characters or less'),
  notes: z.string().max(1000, 'Notes must be 1000 characters or less').nullable().default(null),
  listType: listTypeEnum.optional(),
  scheduledDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .nullable()
    .default(null),
  scheduledTime: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Time must be in HH:MM or HH:MM:SS format')
    .nullable()
    .default(null),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
