import { PropertyDescriptor } from './propertydescriptor';
export declare class TypeDescriptor {
    private properties;
    private addProperty;
    hasProperty(name: string): boolean;
    getProperty(name: string): PropertyDescriptor;
    get propertyNames(): IterableIterator<string>;
    static Create(obj: any): TypeDescriptor;
}
