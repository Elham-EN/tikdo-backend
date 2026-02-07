import type { OpenAPIV3 } from 'openapi-types';

/**
 * Common error response schema
 */
export const errorResponseSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      example: 'An error occurred',
    },
  },
};

/**
 * Common API responses that can be reused across endpoints
 */
export const commonResponses = {
  400: {
    description: 'Bad request',
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
  },
  500: {
    description: 'Server error',
    content: {
      'application/json': {
        schema: errorResponseSchema,
      },
    },
  },
} satisfies Record<string, OpenAPIV3.ResponseObject>;
