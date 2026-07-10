import { describe, expect, it } from 'vitest';
import { formatNumber } from './format-number';

describe('formatNumber', () => {
    it('normalizes percentage floating point artifacts before formatting', () => {
        expect(formatNumber(0.29, ',%')).toBe('29%');
        expect(formatNumber(0.57, ',pp')).toBe('57pp');
    });
});
