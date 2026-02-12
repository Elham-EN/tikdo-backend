/**
 * Defines the Express router for the /tasks resource. It maps
 * HTTP methods and URLs (e.g., POST /, GET /:id) to the
 * corresponding controller functions. No business logic lives
 * here — it's purely the wiring between URLs and handlers.
 */

import express from 'express';
import { TaskController } from './task.controller';

const TaskRouter = express.Router();

// Define task-specific routes

// Endpoint: Creating task
TaskRouter.post('/', TaskController.createTask);

// Endpoint: Getting all tasks
TaskRouter.get('/', TaskController.getTasks);

export default TaskRouter;
