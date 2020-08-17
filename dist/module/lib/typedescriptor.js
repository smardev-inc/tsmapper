/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
import { PropertyDescriptor } from './propertydescriptor';
export class TypeDescriptor {
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
                    const prop = new PropertyDescriptor(propName, hasGetter, hasSetter);
                    descriptor.addProperty(prop);
                }
            }
        }
        return descriptor;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWRlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3R5cGVkZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtEQUFrRDtBQUNsRCxpRUFBaUU7QUFFakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFMUQsTUFBTSxPQUFPLGNBQWM7SUFBM0I7UUFDWSxlQUFVLEdBQW9DLElBQUksR0FBRyxFQUE4QixDQUFDO0lBd0NoRyxDQUFDO0lBdENXLFdBQVcsQ0FBQyxLQUF5QjtRQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxXQUFXLENBQUMsSUFBWTtRQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxXQUFXLENBQUMsSUFBWTtRQUMzQixPQUEyQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFRO1FBQ3pCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN4QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDNUUsSUFBSSxjQUFjLEVBQUU7Z0JBQ2hCLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2xDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDO2dCQUUzRCxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUNsQyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsQ0FBQztnQkFFM0QsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO29CQUN4QixNQUFNLElBQUksR0FBRyxJQUFJLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3BFLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hDO2FBQ0o7U0FDSjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7Q0FDSiJ9