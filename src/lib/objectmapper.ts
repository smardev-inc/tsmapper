/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import * as Utils from './utils';
import { TypeDescriptor } from './typedescriptor';
import { ObjectMapConfiguration } from './objectmapconfiguration';

/**
 * Provides object mapping methods
 */
export class ObjectMapper {
    //private static typeDescriptors = new Map<string, TypeDescriptor>();
    private static mappingNamePrefixes = ['', 'm_', '_'];

    private static getTypeDescriptor(obj: any): TypeDescriptor {
        /*TODO: The caching is not working, need to sort this out
        let clsid = obj.constructor.prototype['CLSID'];
        if (Utils.isNullOrUndefined(clsid)) {
            clsid = '__TSMAPPER_' + ObjectMapper.typeDescriptors.size;
            obj.constructor.prototype['CLSID'] = clsid;
        }

        if (ObjectMapper.typeDescriptors.has(clsid)) {
            return <TypeDescriptor>ObjectMapper.typeDescriptors.get(clsid);
        }
        */

        const descriptor = TypeDescriptor.create(obj);
        //ObjectMapper.typeDescriptors.set(clsid, descriptor);
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

    private static getPropertyValue(sourceDescriptor: TypeDescriptor, source: any, name: string, prefixes: string[]): any {
        for (let i = 0; i < prefixes.length; i++) {
            const fullName = prefixes[i] + name;

            // order is: First search for case sensitive property, next case sensitive field, and after case insensitive
            // property followed by a case insensitive field
            let property = sourceDescriptor.getProperty(fullName, false);
            if (!Utils.isUndefined(property)) {
                return source[property!.name];
            }

            let field = sourceDescriptor.getField(fullName, false);
            if (!Utils.isUndefined(field)) {
                return source[field!.name];
            }

            property = sourceDescriptor.getProperty(fullName, true);
            if (!Utils.isUndefined(property)) {
                return source[property!.name];
            }

            field = sourceDescriptor.getField(fullName, true);
            if (!Utils.isUndefined(field)) {
                return source[field!.name];
            }
        }
    }

    private static autoMapInternal(source: any, factory: () => any): any {
        // mapping from source array
        if (Array.isArray(source)) {
            const array: any[] = [];
            source.forEach((p) => array.push(ObjectMapper.autoMapInternal(p, factory)));
            return array;
        }

        const result = factory();
        const sourceDescriptor = ObjectMapper.getTypeDescriptor(source);
        const targetDescriptor = ObjectMapper.getTypeDescriptor(result);

        Array.from(targetDescriptor.propertyNames).forEach((name) => {
            const value: any = ObjectMapper.getPropertyValue(sourceDescriptor, source, name, ObjectMapper.mappingNamePrefixes);
            (<any>result)[name] = value;
        });

        return result;
    }
}
