import * as Utils from '../lib/utils';
import { describe, it, expect } from 'jest-without-globals';

describe('Utils', () => {
    it('isUndefined tests', () => {
        expect(Utils.isUndefined(undefined)).toBe(true);
        expect(Utils.isUndefined(1234)).toBe(false);
        expect(Utils.isUndefined(null)).toBe(false);
    });

    it('isNullOrUndefined tests', () => {
        expect(Utils.isNullOrUndefined(undefined)).toBe(true);
        expect(Utils.isNullOrUndefined(1234)).toBe(false);
        expect(Utils.isNullOrUndefined(null)).toBe(true);
    });
});
