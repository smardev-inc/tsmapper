/* eslint @typescript-eslint/no-explicit-any: 0 */

import * as Utils from './utils';

export const Strings = {
    argumentNullException: (...args: any[]): string => Utils.formatString('Argument null exception ({0})', args)
};
