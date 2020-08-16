/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

import { PropertyDescriptor } from './propertydescriptor';

export class TypeDescriptor {
    private properties: Map<string, PropertyDescriptor> = new Map<string, PropertyDescriptor>();

    private addProperty(value: PropertyDescriptor) {
        this.properties.set(value.name, value);
    }

    public hasProperty(name: string): boolean {
        return this.properties.has(name);
    }

    public getProperty(name: string): PropertyDescriptor {
        return <PropertyDescriptor>this.properties.get(name);
    }

    public get propertyNames(): IterableIterator<string> {
        return this.properties.keys();
    }

    public static Create(obj: any): TypeDescriptor {
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
