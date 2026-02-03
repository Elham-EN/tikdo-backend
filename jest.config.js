/** @type {import('jest').Config} */
const config = {
  // Use ts-jest preset configured for ES Modules
  preset: 'ts-jest/presets/default-esm',

  // Run tests in Node.js environment (not browser/jsdom)
  testEnvironment: 'node',

  // Treat .ts files as ES Modules
  extensionsToTreatAsEsm: ['.ts'],

  // Strip .js extension from imports (ESM compatibility fix)
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Transform TypeScript files using ts-jest with ESM support
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ES Module output
        tsconfig: 'tsconfig.json', // Use project's TypeScript config
      },
    ],
  },

  // Directories where Jest looks for test files
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Patterns to find test files
  testMatch: [
    '**/__tests__/**/*.test.ts', // Inline tests in src
    '**/tests/unit/**/*.test.ts', // Unit tests
    '**/tests/integration/**/*.test.ts', // Integration tests
  ],

  // File extensions Jest will process
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Files to include in coverage report
  collectCoverageFrom: [
    'src/**/*.ts', // All TypeScript files in src
    '!src/**/*.d.ts', // Exclude type declaration files
    '!src/**/index.ts', // Exclude barrel/index files
  ],

  // Output directory for coverage reports
  coverageDirectory: 'coverage',

  // Coverage report formats: terminal, lcov (for CI), HTML (for browser)
  coverageReporters: ['text', 'lcov', 'html'],

  // Show individual test results
  verbose: true,

  // Reset mock state between tests
  clearMocks: true,

  // Reset mock implementations between tests
  resetMocks: true,
};

export default config;
