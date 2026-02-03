import { describe, it, expect } from '@jest/globals';

describe('Sample Unit Test', () => {
  it('should pass a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const greeting = 'Hello, Jest!';
    expect(greeting).toContain('Jest');
  });

  it('should work with objects', () => {
    const user = { name: 'John', age: 30 };
    expect(user).toEqual({ name: 'John', age: 30 });
  });
});
