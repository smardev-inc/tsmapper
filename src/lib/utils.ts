/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

export type Class<T> = new (...args: any[]) => T;

/**
 * Checks if the given argument is undefined.
 * @function
 */
export const isUndefined = function (obj: any): boolean {
    return typeof obj === 'undefined';
};

/**
 * Checks if the given argument is not null or undefined
 * @function
 */
export const isNullOrUndefined = function (value: any) {
    return value === null || isUndefined(value);
};
