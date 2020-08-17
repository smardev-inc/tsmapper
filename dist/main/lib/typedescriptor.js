"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDescriptor = void 0;
const propertydescriptor_1 = require("./propertydescriptor");
class TypeDescriptor {
    constructor() {
        this.properties = new Map();
    }
    addProperty(value) {
        this.properties.set(value.name, value);
    }
    hasProperty(name) {
        return this.properties.has(name);
    }
    getProperty(name) {
        return this.properties.get(name);
    }
    get propertyNames() {
        return this.properties.keys();
    }
    static Create(obj) {
        const prototype = Object.getPrototypeOf(obj);
        const descriptor = new TypeDescriptor();
        const propNames = Object.getOwnPropertyNames(prototype);
        for (let i = 0; i < propNames.length; i++) {
            const propName = propNames[i];
            const propDescriptor = Object.getOwnPropertyDescriptor(prototype, propName);
            if (propDescriptor) {
                const getter = propDescriptor.get;
                const hasGetter = !!getter && typeof getter === 'function';
                const setter = propDescriptor.set;
                const hasSetter = !!setter && typeof setter === 'function';
                if (hasGetter || hasSetter) {
                    const prop = new propertydescriptor_1.PropertyDescriptor(propName, hasGetter, hasSetter);
                    descriptor.addProperty(prop);
                }
            }
        }
        return descriptor;
    }
}
exports.TypeDescriptor = TypeDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWRlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3R5cGVkZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBa0Q7QUFDbEQsaUVBQWlFOzs7QUFFakUsNkRBQTBEO0FBRTFELE1BQWEsY0FBYztJQUEzQjtRQUNZLGVBQVUsR0FBb0MsSUFBSSxHQUFHLEVBQThCLENBQUM7SUF3Q2hHLENBQUM7SUF0Q1csV0FBVyxDQUFDLEtBQXlCO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVcsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxJQUFZO1FBQzNCLE9BQTJCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQVE7UUFDekIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM1RSxJQUFJLGNBQWMsRUFBRTtnQkFDaEIsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFDbEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLENBQUM7Z0JBRTNELE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2xDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDO2dCQUUzRCxJQUFJLFNBQVMsSUFBSSxTQUFTLEVBQUU7b0JBQ3hCLE1BQU0sSUFBSSxHQUFHLElBQUksdUNBQWtCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDcEUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBekNELHdDQXlDQyJ9