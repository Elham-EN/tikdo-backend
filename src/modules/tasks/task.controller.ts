/**
 * Handles the HTTP layer. It receives Request/Response objects,
 * extracts data from the request body/params/query, calls the
 * service layer, and sends back the appropriate HTTP response
 * with status codes. Think of it as the translator between HTTP
 * and your business logic.
 */

import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createTaskSchema } from './task.validation';
import { TaskService } from './task.service';

async function createTask(req: Request, res: Response) {
  try {
    // Extract data from the request body & perform validation
    const task = createTaskSchema.parse(req.body);
    // Create task and save to the database
    const result = await TaskService.createTask(task);
    // Send Response to the client
    res.status(201).json(result);
  } catch (error) {
    // Zod validation error — bad input from the client
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    // Everything else — unexpected server error
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
}

async function getTasks(req: Request, res: Response) {
  try {
    const todoItems = await TaskService.getTasks();
    res.status(200).send(todoItems);
  } catch (error) {
    console.error('Error getting all tasks', error);
    res.status(500).json({ error: 'Failed to get tasks' });
  }
}

export const TaskController = { createTask, getTasks };
