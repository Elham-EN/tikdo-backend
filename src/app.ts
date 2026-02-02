/**
 * Responsible for the core logic and configuration of your Express
 * application. It defines how your application handles requests.
 *
 * Setup Global Milddwars, Routing, App Instance Export
 */

import express, { type Application, type Request, type Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './docs/openapi.js';

// Express Application
const app: Application = express();
const port: number = 3000;

// Global Middlewares
app.use(express.json());

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
