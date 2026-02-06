import type { OpenAPIV3 } from 'openapi-types';

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
    '/api/v1/data': {
      get: {
        summary: 'Get sample data',
        description: 'Returns sample data with message, timestamp and items',
        tags: ['Data'],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hello from the API!',
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-02-02T12:00:00.000Z',
                    },
                    items: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                      example: ['item1', 'item2', 'item3'],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/tasks': {
      post: {
        summary: 'Create a new task',
        description: 'Creates a new task in the inbox by default',
        tags: ['Tasks'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    description: 'Task title',
                    example: 'Buy groceries',
                  },
                  notes: {
                    type: 'string',
                    description: 'Optional task notes',
                    example: 'Milk, eggs, bread',
                  },
                  listType: {
                    type: 'string',
                    enum: ['inbox', 'today', 'upcoming', 'anytime', 'someday'],
                    description: 'Which list the task belongs to',
                    example: 'inbox',
                  },
                  scheduledDate: {
                    type: 'string',
                    format: 'date',
                    description: 'Scheduled date (YYYY-MM-DD)',
                    example: '2026-02-10',
                  },
                  scheduledTime: {
                    type: 'string',
                    format: 'time',
                    description: 'Scheduled time (HH:MM:SS)',
                    example: '14:30:00',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 1,
                    },
                    title: {
                      type: 'string',
                      example: 'Buy groceries',
                    },
                    notes: {
                      type: 'string',
                      nullable: true,
                      example: 'Milk, eggs, bread',
                    },
                    listType: {
                      type: 'string',
                      enum: ['inbox', 'today', 'upcoming', 'anytime', 'someday'],
                      example: 'inbox',
                    },
                    status: {
                      type: 'string',
                      enum: ['pending', 'completed', 'deleted'],
                      example: 'pending',
                    },
                    scheduledDate: {
                      type: 'string',
                      format: 'date',
                      nullable: true,
                      example: '2026-02-10',
                    },
                    scheduledTime: {
                      type: 'string',
                      format: 'time',
                      nullable: true,
                      example: '14:30:00',
                    },
                    isOverdue: {
                      type: 'boolean',
                      example: false,
                    },
                    position: {
                      type: 'integer',
                      example: 0,
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-02-06T14:30:00.000Z',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-02-06T14:30:00.000Z',
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Failed to create task',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
