import type { OpenAPIV3 } from 'openapi-types';

/**
 * Path definitions for /api/v1/data endpoints
 */
export const dataPaths: OpenAPIV3.PathsObject = {
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
};
