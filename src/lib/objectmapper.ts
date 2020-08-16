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

        const descriptor = TypeDescriptor.Create(obj);
        ObjectMapper.typeDescriptors.set(clsid, descriptor);
        return descriptor;
    }

    /**
     * Maps the source instance to the destination, using the provided configuration
     *
     * @param config
     * The mapping configuration to be used
     *
     * @param source
     * The source instance
     *
     * @param destination
     * The destination instance
     *
     * @returns
     * The destination instance
     */
    public static map<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom, destination: TTo): TTo {
        config.mappingInstructions.forEach((instruction) => {
            if (!Utils.isNullOrUndefined(instruction.target)) {
                const value: any = (<any>source)[instruction.name];
                const target: string = <string>instruction.target;
                (<any>destination)[target] = value;
            }
        });

        return destination;
    }

    /**
     * Maps the source instance to the destination, using default maping configuration
     *
     * @param source
     * The source instance
     *
     * @param destination
     * The destination instance
     *
     * @returns
     * The destination instance
     */
    public static autoMap<TFrom, TTo>(source: TFrom, destination: TTo): TTo {
        const descriptor = ObjectMapper.getTypeDescriptor(source);
        Array.from(descriptor.propertyNames).forEach((propName) => {
            const value: any = (<any>source)[propName];
            (<any>destination)[propName] = value;
        });

        return destination;
    }
}
