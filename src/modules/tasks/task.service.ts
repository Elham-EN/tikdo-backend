/**
 * Contains the business logic and data access. It talks to Prisma,
 * applies any rules or transformations, and returns plain data
 * back to the controller. This layer has no knowledge of HTTP —
 * it doesn't know about req or res.
 */

import { prisma } from '../../shared/utils/prisma';
import type { CreateTaskInput } from './task.validation';

async function createTask(createTaskInput: CreateTaskInput) {
  const task = await prisma.task.create({
    data: {
      title: createTaskInput.title,
      notes: createTaskInput.notes,
      // Convert string inputs to Date objects for Prisma's @db.Date and @db.Time columns
      scheduledDate: createTaskInput.scheduledDate ? new Date(createTaskInput.scheduledDate) : null,
      // Time-only value needs a dummy date prefix to create a valid Date object
      scheduledTime: createTaskInput.scheduledTime
        ? new Date(`1970-01-01T${createTaskInput.scheduledTime}`)
        : null,
      // Only include listType if provided; otherwise Prisma uses @default(inbox)
      // When listType is provided (e.g. "today"): the condition is true, so
      // { listType: "today" } gets spread into data — Prisma uses that value.
      // OR ELSE
      // When listType is omitted/undefined: the condition is false, so false gets spread
      // (which adds nothing) — the listType property is completely absent from data.
      // Prisma then falls back to @default(inbox) from your schema.
      ...(createTaskInput.listType !== undefined && { listType: createTaskInput.listType }),
    },
  });

  return task;
}

async function getTasks() {
  return await prisma.task.findMany({
    // Get all todoitems that are not deleted
    where: {
      status: { not: 'deleted' },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export const TaskService = { createTask, getTasks };
