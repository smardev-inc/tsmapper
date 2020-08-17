"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrUndefined = exports.isUndefined = void 0;
/**
 * Checks if the given argument is undefined.
 * @function
 */
exports.isUndefined = function (obj) {
    return typeof obj === 'undefined';
};
/**
 * Checks if the given argument is not null or undefined
 * @function
 */
exports.isNullOrUndefined = function (value) {
    return value === null || exports.isUndefined(value);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBa0Q7QUFDbEQsaUVBQWlFOzs7QUFJakU7OztHQUdHO0FBQ1UsUUFBQSxXQUFXLEdBQUcsVUFBVSxHQUFRO0lBQ3pDLE9BQU8sT0FBTyxHQUFHLEtBQUssV0FBVyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGOzs7R0FHRztBQUNVLFFBQUEsaUJBQWlCLEdBQUcsVUFBVSxLQUFVO0lBQ2pELE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELENBQUMsQ0FBQyJ9