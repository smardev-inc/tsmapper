/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

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
export const isNullOrUndefined = function (value: any): boolean {
    return value === null || isUndefined(value);
};

/**
 * Formats text string using the given arguments
 * @function
 */
export const formatString = function (format: string, ...args: any[]): string {
    return format.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};
