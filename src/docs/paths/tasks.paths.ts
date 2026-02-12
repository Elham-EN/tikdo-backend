import type { OpenAPIV3 } from 'openapi-types';
import { createTaskSchema, taskSchema } from '../schemas/task.schema.js';
import { commonResponses } from '../schemas/common.schema.js';

/**
 * Path definitions for /api/v1/tasks endpoints
 */
export const tasksPaths: OpenAPIV3.PathsObject = {
  '/api/v1/tasks': {
    post: {
      summary: 'Create a new task',
      description: 'Creates a new task in the inbox by default',
      tags: ['Tasks'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: createTaskSchema,
          },
        },
      },
      responses: {
        '201': {
          description: 'Task created successfully',
          content: {
            'application/json': {
              schema: taskSchema,
            },
          },
        },
        '500': commonResponses[500],
      },
    },
    get: {
      summary: 'Get all tasks',
      description: 'Returns all tasks that are not deleted, ordered by creation date (newest first)',
      tags: ['Tasks'],
      responses: {
        '200': {
          description: 'List of tasks',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: taskSchema,
              },
            },
          },
        },
        '500': commonResponses[500],
      },
    },
  },
};
