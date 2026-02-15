/**
 * Contains the business logic and data access. It talks to Prisma,
 * applies any rules or transformations, and returns plain data
 * back to the controller. This layer has no knowledge of HTTP —
 * it doesn't know about req or res.
 */

import { prisma } from '../../shared/utils/prisma';
import type { CreateTaskInput, MoveTaskInput } from './task.validation';

async function createTask(createTaskInput: CreateTaskInput) {
  // Determine the target list (default to inbox if not provided)
  const targetList = createTaskInput.listType ?? 'inbox';

  // Get the highest position in the target list
  const maxPosition = await prisma.task.aggregate({
    where: {
      listType: targetList,
      status: { not: 'deleted' },
    },
    _max: { position: true },
  });

  // New task goes at the end (max + 1, or 1 if no tasks exist)
  const newPosition = (maxPosition._max.position ?? 0) + 1;

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
      position: newPosition,
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
    orderBy: [{ listType: 'asc' }, { position: 'asc' }],
  });
}

async function moveTask(id: number, input: MoveTaskInput) {
  return await prisma.task.update({
    where: { id },
    data: {
      // The parentheses () in this code are used to group an expression—specifically a logical
      // AND (&&) evaluation—before the spread operator (...) unpacks it into the object.
      ...(input.listType !== undefined && { listType: input.listType }),
      ...(input.status !== undefined && { status: input.status }),
    },
  });
}

/**
 * Reorder a task within its list by moving it to a new position.
 * This updates the position of the dragged item and shifts other items as needed.
 */
async function reorderTask(id: number, newPosition: number) {
  // Get the task being moved
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  const oldPosition = task.position;
  const listType = task.listType;

  // If position hasn't changed, nothing to do
  if (oldPosition === newPosition) {
    return task;
  }

  // Use a transaction to ensure atomicity
  return await prisma.$transaction(async (tx) => {
    if (newPosition > oldPosition) {
      // Moving down: shift items between oldPosition and newPosition up by 1
      await tx.task.updateMany({
        where: {
          listType,
          status: { not: 'deleted' },
          position: { gt: oldPosition, lte: newPosition },
        },
        data: { position: { decrement: 1 } },
      });
    } else {
      // Moving up: shift items between newPosition and oldPosition down by 1
      await tx.task.updateMany({
        where: {
          listType,
          status: { not: 'deleted' },
          position: { gte: newPosition, lt: oldPosition },
        },
        data: { position: { increment: 1 } },
      });
    }

    // Update the dragged task's position
    return await tx.task.update({
      where: { id },
      data: { position: newPosition },
    });
  });
}

export const TaskService = { createTask, getTasks, moveTask, reorderTask };
