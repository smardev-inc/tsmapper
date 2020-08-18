/* eslint @typescript-eslint/no-explicit-any: 0 */

import * as Utils from './utils';
import { TypeDescriptor } from './typedescriptor';
import { ObjectMapConfiguration } from './objectmapconfiguration';

/**
 * Provides object mapping methods
 */
export class ObjectMapper {
    private static typeDescriptors = new Map<string, TypeDescriptor>();

    private static getTypeDescriptor(obj: any): TypeDescriptor {
        let clsid = obj.constructor.prototype['CLSID'];
        if (Utils.isNullOrUndefined(clsid)) {
            clsid = '__TSMAPPER_' + ObjectMapper.typeDescriptors.size;
            obj.constructor.prototype['CLSID'] = clsid;
        }

        if (ObjectMapper.typeDescriptors.has(clsid)) {
            return <TypeDescriptor>ObjectMapper.typeDescriptors.get(clsid);
        }

        const descriptor = TypeDescriptor.create(obj);
        ObjectMapper.typeDescriptors.set(clsid, descriptor);
        return descriptor;
    }

    /**
     * Maps the source instance to a new instance of TTo, using the provided configuration
     *
     * @param config
     * The mapping configuration to be used
     *
     * @param source
     * The source instance
     *
     * @param factory
     * The destination instance creation factory
     *
     * @returns
     * The newly created TTo instance instance
     */
    public static map<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom | TFrom[], factory: () => TTo): TTo | TTo[] {
        return ObjectMapper.mapInternal(config, source, factory);
    }

    /**
     * Maps the source instance to a new instance of TTo, using the provided configuration
     *
     * @param config
     * The mapping configuration to be used
     *
     * @param source
     * The source instance
     *
     * @param factory
     * The destination instance creation factory
     *
     * @returns
     * The newly created TTo instance instance
     */
    public static mapSingle<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom, factory: () => TTo): TTo {
        return ObjectMapper.mapInternal(config, source, factory);
    }

    /**
     * Maps the source instance array to an array of TTo instances, using the provided configuration
     *
     * @param config
     * The mapping configuration to be used
     *
     * @param source
     * The source instance
     *
     * @param factory
     * The destination instance creation factory
     *
     * @returns
     * The an array of TTo instances
     */
    public static mapArray<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom[], factory: () => TTo): Array<TTo> {
        return ObjectMapper.mapInternal(config, source, factory);
    }

    private static mapInternal(config: ObjectMapConfiguration, source: any, factory: () => any): any {
        // mapping from source array
        if (Array.isArray(source)) {
            const array: any[] = [];
            source.forEach((p) => array.push(ObjectMapper.mapInternal(config, p, factory)));
            return array;
        }

        const result = factory();
        config.mappingInstructions.forEach((instruction) => {
            const value = instruction.getMappedValue(source);
            (<any>result)[instruction.propertyName] = value;
        });

        return result;
    }

    /**
     * Maps the source instance to the destination, using default maping configuration
     *
     * @param source
     * The source instance
     *
     * @param factory
     * The destination instance creation factory
     *
     * @returns
     * The destination instance
     */
    public static autoMap<TFrom, TTo>(source: TFrom | TFrom[], factory: () => TTo): TTo | TTo[] {
        return ObjectMapper.autoMapInternal(source, factory);
    }
    /**
     * Maps the source instance to a new array of TTo instances, using default maping configuration
     *
     * @param source
     * The source instance
     *
     * @param factory
     * The destination instance creation factory
     *
     * @returns
     * The destination instance
     */
    public static autoMapArray<TFrom, TTo>(source: TFrom[], factory: () => TTo): TTo[] {
        return ObjectMapper.autoMapInternal(source, factory);
    }
    /**
     * Maps the source instance to the destination, using default maping configuration
     *
     * @param source
     * The source instance
     *
     * @param factory
     * The destination instance creation factory
     *
     * @returns
     * The destination instance
     */
    public static autoMapSingle<TFrom, TTo>(source: TFrom, factory: () => TTo): TTo {
        return ObjectMapper.autoMapInternal(source, factory);
    }

    private static autoMapInternal(source: any, factory: () => any): any {
        // mapping from source array
        if (Array.isArray(source)) {
            const array: any[] = [];
            source.forEach((p) => array.push(ObjectMapper.autoMapInternal(p, factory)));
            return array;
        }

        const descriptor = ObjectMapper.getTypeDescriptor(source);

        const result = factory();
        Array.from(descriptor.propertyNames).forEach((name) => {
            const value: any = (<any>source)[name];
            (<any>result)[name] = value;
        });

        Array.from(descriptor.fieldNames).forEach((name) => {
            const value: any = (<any>source)[name];
            (<any>result)[name] = value;
        });

        return result;
    }
}
