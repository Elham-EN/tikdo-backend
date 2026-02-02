/**
 * Responsible for the core logic and configuration of your Express
 * application. It defines how your application handles requests.
 *
 * Setup Global Milddwars, Routing, App Instance Export
 */

import express, { type Application, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import { openApiSpec } from './docs/openapi.js';

// Express Application
const app: Application = express();
const port: number = 3000;

// Global Middlewares
// Parse incoming HTTP requests bodies contain JSON payload
app.use(express.json());

// Request logging - shows: timestamp, method, url, status, response time, size
morgan.token('timestamp', () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Australia/Melbourne',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const formatted = now.toLocaleString('en-AU', options).replace(',', '').toUpperCase();
  return formatted;
});
app.use(morgan(':timestamp :method :url :status :response-time ms - :res[content-length]'));

// API Documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Define a route handler for test
app.get('/api/v1/data', (req: Request, res: Response) => {
  const data = {
    message: 'Hello from the API!',
    timestamp: new Date().toISOString(),
    items: ['item1', 'item2', 'item3'],
  };
  res.json(data);
});

export { app, port };
