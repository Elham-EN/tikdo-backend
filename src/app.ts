/**
 * Responsible for the core logic and configuration of your Express
 * application. It defines how your application handles requests.
 *
 * Setup Global Milddwars, Routing, App Instance Export
 */

import express, { type Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import TaskRouter from './modules/tasks/task.routes';
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

// Mount the TaskRouter at the '/api/tasks' base path
app.use('/api/v1/tasks', TaskRouter);

export { app, port };
