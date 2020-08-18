import { PropertyDescriptor } from './propertydescriptor';
import { FieldDescriptor } from './fielddescriptor';
export declare class TypeDescriptor {
    private properties;
    private fields;
    private addProperty;
    hasProperty(name: string): boolean;
    getProperty(name: string): PropertyDescriptor;
    get propertyNames(): IterableIterator<string>;
    private addField;
    hasField(name: string): boolean;
    getField(name: string): FieldDescriptor;
    get fieldNames(): IterableIterator<string>;
    static create(obj: any): TypeDescriptor;
}
