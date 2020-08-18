/* eslint @typescript-eslint/no-explicit-any: 0 */
import * as Utils from './utils';
import { TypeDescriptor } from './typedescriptor';
/**
 * Provides object mapping methods
 */
export class ObjectMapper {
    static getTypeDescriptor(obj) {
        let clsid = obj.constructor.prototype['CLSID'];
        if (Utils.isNullOrUndefined(clsid)) {
            clsid = '__TSMAPPER_' + ObjectMapper.typeDescriptors.size;
            obj.constructor.prototype['CLSID'] = clsid;
        }
        if (ObjectMapper.typeDescriptors.has(clsid)) {
            return ObjectMapper.typeDescriptors.get(clsid);
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
    static map(config, source, factory) {
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
    static mapSingle(config, source, factory) {
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
    static mapArray(config, source, factory) {
        return ObjectMapper.mapInternal(config, source, factory);
    }
    static mapInternal(config, source, factory) {
        // mapping from source array
        if (Array.isArray(source)) {
            const array = [];
            source.forEach((p) => array.push(ObjectMapper.mapInternal(config, p, factory)));
            return array;
        }
        const result = factory();
        config.mappingInstructions.forEach((instruction) => {
            const value = instruction.getMappedValue(source);
            result[instruction.propertyName] = value;
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
    static autoMap(source, factory) {
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
    static autoMapArray(source, factory) {
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
    static autoMapSingle(source, factory) {
        return ObjectMapper.autoMapInternal(source, factory);
    }
    static autoMapInternal(source, factory) {
        // mapping from source array
        if (Array.isArray(source)) {
            const array = [];
            source.forEach((p) => array.push(ObjectMapper.autoMapInternal(p, factory)));
            return array;
        }
        const descriptor = ObjectMapper.getTypeDescriptor(source);
        const result = factory();
        Array.from(descriptor.propertyNames).forEach((name) => {
            const value = source[name];
            result[name] = value;
        });
        Array.from(descriptor.fieldNames).forEach((name) => {
            const value = source[name];
            result[name] = value;
        });
        return result;
    }
}
ObjectMapper.typeDescriptors = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vYmplY3RtYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBRWxELE9BQU8sS0FBSyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdsRDs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBR2IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQVE7UUFDckMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUMxRCxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFFRCxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE9BQXVCLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBYSxNQUE4QixFQUFFLE1BQXVCLEVBQUUsT0FBa0I7UUFDckcsT0FBTyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxN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