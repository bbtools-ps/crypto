import { vi } from 'vitest';
import { getCurrentYear } from './dates';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('getCurrentYear()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the current year', () => {
    const mockDate = new Date(2022, 0, 1);
    vi.setSystemTime(mockDate);

    const result = getCurrentYear();

    expect(result).toBe(2022);
  });
});
