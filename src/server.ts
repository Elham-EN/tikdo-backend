/**
 * The application's entry point and is responsible for
 * network-related tasks and starting the server.
 *
 * Port Config, Starting Listener, and Env Specific
 */

import http from 'http';
import { app, port } from './app.js';

const server: http.Server = http.createServer(app);

server.listen(port, () => {
  console.info(`⚡️Server is running at http://localhost:${port}`);
});

// Handle server errors
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
