/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
import { PropertyDescriptor } from './propertydescriptor';
import { FieldDescriptor } from './fielddescriptor';
export class TypeDescriptor {
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
                        const prop = new PropertyDescriptor(propName, hasGetter, hasSetter);
                        descriptor.addProperty(prop);
                    }
                }
            }
        }
        const keys = obj.keys;
        if (keys) {
            for (let i = 0; i < keys.length; i++) {
                const fieldName = keys[i];
                descriptor.addField(new FieldDescriptor(fieldName));
            }
        }
        for (const fieldName in obj) {
            descriptor.addField(new FieldDescriptor(fieldName));
        }
        return descriptor;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWRlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3R5cGVkZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQUNsRCxpRUFBaUU7QUFFakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXBELE1BQU0sT0FBTyxjQUFjO0lBQTNCO1FBQ1ksZUFBVSxHQUFvQyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztRQUNwRixXQUFNLEdBQWlDLElBQUksR0FBRyxFQUE4QixDQUFDO0lBeUV6RixDQUFDO0lBdkVXLFdBQVcsQ0FBQyxLQUF5QjtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxXQUFXLENBQUMsSUFBWTtRQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxXQUFXLENBQUMsSUFBWTtRQUMzQixPQUEyQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU8sUUFBUSxDQUFDLEtBQXNCO1FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFZO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFZO1FBQ3hCLE9BQXdCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFXLFVBQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQVE7UUFDekIsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUIsSUFBSSxRQUFRLElBQUksV0FBVyxFQUFFO2dCQUN6Qiw0QkFBNEI7Z0JBQzVCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVFLElBQUksY0FBYyxFQUFFO29CQUNoQixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO29CQUNsQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztvQkFFM0QsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztvQkFDbEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLENBQUM7b0JBRTNELElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTt3QkFDeEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQztpQkFDSjthQUNKO1NBQ0o7UUFFRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksSUFBSSxFQUFFO1lBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0o7UUFFRCxLQUFLLE1BQU0sU0FBUyxJQUFJLEdBQUcsRUFBRTtZQUN6QixVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0NBQ0oifQ==