/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

import { PropertyDescriptor } from './propertydescriptor';
import { FieldDescriptor } from './fielddescriptor';

export class TypeDescriptor {
    private properties: Map<string, PropertyDescriptor> = new Map<string, PropertyDescriptor>();
    private fields: Map<string, FieldDescriptor> = new Map<string, FieldDescriptor>();

    private addProperty(value: PropertyDescriptor) {
        this.properties.set(value.name, value);
    }

    public hasProperty(name: string): boolean {
        return this.properties.has(name);
    }

    private static mapSearch<T>(map: Map<string, T>, name: string, caseSensitiveSearch = true): T | undefined {
        if (caseSensitiveSearch) {
            return map.get(name);
        } else {
            let count = 0;
            let result: T | undefined = undefined;
            const nameLower = name.toLowerCase();
            map.forEach((value: T, key: string) => {
                if (key.toLowerCase() == nameLower) {
                    count++;
                    result = value;
                }
            });

            if (count > 1) {
                throw new Error('Multiple properties with same name and different case. Case insensitive search not possible');
            }

            return result;
        }
    }

    public getProperty(name: string, caseSensitiveSearch = true): PropertyDescriptor | undefined {
        return TypeDescriptor.mapSearch(this.properties, name, caseSensitiveSearch);
    }

    public get propertyNames(): IterableIterator<string> {
        return this.properties.keys();
    }

    private addField(value: FieldDescriptor) {
        this.fields.set(value.name, value);
    }

    public hasField(name: string): boolean {
        return this.fields.has(name);
    }

    public getField(name: string, caseSensitiveSearch = true): FieldDescriptor | undefined {
        return TypeDescriptor.mapSearch(this.fields, name, caseSensitiveSearch);
    }

    public get fieldNames(): IterableIterator<string> {
        return this.fields.keys();
    }

    public static create(obj: any): TypeDescriptor {
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
