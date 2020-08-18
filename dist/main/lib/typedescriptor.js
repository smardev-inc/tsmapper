"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeDescriptor = void 0;
const propertydescriptor_1 = require("./propertydescriptor");
const fielddescriptor_1 = require("./fielddescriptor");
class TypeDescriptor {
    constructor() {
        this.properties = new Map();
        this.fields = new Map();
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
    addField(value) {
        this.fields.set(value.name, value);
    }
    hasField(name) {
        return this.fields.has(name);
    }
    getField(name) {
        return this.fields.get(name);
    }
    get fieldNames() {
        return this.fields.keys();
    }
    static create(obj) {
        const prototype = Object.getPrototypeOf(obj);
        const descriptor = new TypeDescriptor();
        const propNames = Object.getOwnPropertyNames(prototype);
        for (let i = 0; i < propNames.length; i++) {
            const propName = propNames[i];
            if (propName != '__proto__') {
                // ignore special properties
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
        }
        const keys = obj.keys;
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                const fieldName = keys[i];
                descriptor.addField(new fielddescriptor_1.FieldDescriptor(fieldName));
            }
        }
        for (const fieldName in obj) {
            descriptor.addField(new fielddescriptor_1.FieldDescriptor(fieldName));
        }
        return descriptor;
    }
}
exports.TypeDescriptor = TypeDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWRlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3R5cGVkZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxrREFBa0Q7QUFDbEQsaUVBQWlFOzs7QUFFakUsNkRBQTBEO0FBQzFELHVEQUFvRDtBQUVwRCxNQUFhLGNBQWM7SUFBM0I7UUFDWSxlQUFVLEdBQW9DLElBQUksR0FBRyxFQUE4QixDQUFDO1FBQ3BGLFdBQU0sR0FBaUMsSUFBSSxHQUFHLEVBQThCLENBQUM7SUF5RXpGLENBQUM7SUF2RVcsV0FBVyxDQUFDLEtBQXlCO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFdBQVcsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxJQUFZO1FBQzNCLE9BQTJCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDcEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTyxRQUFRLENBQUMsS0FBc0I7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sUUFBUSxDQUFDLElBQVk7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sUUFBUSxDQUFDLElBQVk7UUFDeEIsT0FBd0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBUTtRQUN6QixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sVUFBVSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDeEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5QixJQUFJLFFBQVEsSUFBSSxXQUFXLEVBQUU7Z0JBQ3pCLDRCQUE0QjtnQkFDNUIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxjQUFjLEVBQUU7b0JBQ2hCLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7b0JBQ2xDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDO29CQUUzRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO29CQUNsQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztvQkFFM0QsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO3dCQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLHVDQUFrQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQ3BFLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hDO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxJQUFJLEVBQUU7WUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksaUNBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0o7UUFFRCxLQUFLLE1BQU0sU0FBUyxJQUFJLEdBQUcsRUFBRTtZQUN6QixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksaUNBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBM0VELHdDQTJFQyJ9