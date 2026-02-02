/**
 * Responsible for the core logic and configuration of your Express
 * application. It defines how your application handles requests.
 *
 * Setup Global Milddwars, Routing, App Instance Export
 */

import express, { type Application, type Request, type Response } from 'express';

// Express Application
const app: Application = express();
const port: number = 3000;

// Global Middlewares
app.use(express.json());

// Define a route handler for test
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Express & TypeScript');
});

export { app, port };
