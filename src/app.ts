/**
 * Responsible for the core logic and configuration of your Express
 * application. It defines how your application handles requests.
 *
 * Setup Global Milddwars, Routing, App Instance Export
 */

import express, { type Application, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { prisma } from './shared/utils/prisma';
import { openApiSpec } from './docs/openapi.js';
import { timestampMelbourne } from './shared/utils/dateHelper.js';

// Express Application
const app: Application = express();
const port: number = 3000;

// Global Middlewares
// Parse incoming HTTP requests bodies contain JSON payload
app.use(express.json());

// Request logging - shows: timestamp, method, url, status, response time, size
morgan.token('timestamp', () => timestampMelbourne());
app.use(morgan(':timestamp :method :url :status :response-time ms - :res[content-length]'));

// API Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Define a route handler for test
app.get('/api/v1/data', (req: Request, res: Response) => {
  const data = {
    message: 'Hello from the API!',
    timestamp: timestampMelbourne(),
    items: ['item1', 'item2', 'item3'],
  };
  res.json(data);
});

// Create a new task
app.post('/api/v1/tasks', async (req: Request, res: Response) => {
  try {
    const { title, notes, listType, scheduledDate, scheduledTime } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        notes,
        listType,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        scheduledTime: scheduledTime ? new Date(`1970-01-01T${scheduledTime}`) : null,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export { app, port };
