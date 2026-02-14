import type { OpenAPIV3 } from 'openapi-types';
import { createTaskSchema, moveTaskSchema, taskSchema } from '../schemas/task.schema.js';
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
  '/api/v1/tasks/{id}/move': {
    patch: {
      summary: 'Move a task',
      description: 'Move a task to a different list or update its status (e.g. complete, delete)',
      tags: ['Tasks'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Task ID',
          schema: {
            type: 'integer',
            example: 1,
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: moveTaskSchema,
          },
        },
      },
      responses: {
        '200': {
          description: 'Task moved successfully',
          content: {
            'application/json': {
              schema: taskSchema,
            },
          },
        },
        '400': commonResponses[400],
        '500': commonResponses[500],
      },
    },
  },
};
