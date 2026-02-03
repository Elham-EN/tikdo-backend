import { timestampMelbourne } from '../../../../src/shared/utils/dateHelper.js';

/**
 * Structure your tests using the Arrange, Act, Assert (AAA) pattern
 */
// Cover the essential behavior:
describe('timestampMelbourne format verification', () => {
  // Test Case 01:
  test('It should return a string', () => {
    // Arrange - no setup needed for this test

    // Act
    const result = timestampMelbourne();

    // Assert - checks exact equality
    expect(typeof result).toBe('string');
  });

  // Test Case 02:
  test('It should match DD/MM/YYYY HH:MM AM/PM format', () => {
    // Arrange - regex pattern for: "03/02/2026 07:07 PM"
    const formatPattern = /^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2} (AM|PM)$/;

    // Act
    const result = timestampMelbourne();

    // Assert - validates against a pattern
    expect(result).toMatch(formatPattern);
  });
});
