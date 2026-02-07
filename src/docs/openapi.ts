import type { OpenAPIV3 } from 'openapi-types';
import { dataPaths } from './paths/data.paths.js';
import { tasksPaths } from './paths/tasks.paths.js';

/**
 * Main OpenAPI specification document.
 * Merges all path definitions from modular files.
 *
 * To add new endpoints:
 * 1. Create/update schema files in ./schemas/
 * 2. Create/update path files in ./paths/
 * 3. Import and merge the paths below
 */
export const openApiSpec: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Tikdo API',
    version: '1.0.0',
    description: 'Tikdo Backend API Documentation',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  paths: {
    ...dataPaths,
    ...tasksPaths,
  },
};
