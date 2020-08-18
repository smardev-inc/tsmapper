"use strict";
/* eslint @typescript-eslint/no-explicit-any: 0 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectMapper = void 0;
const Utils = __importStar(require("./utils"));
const typedescriptor_1 = require("./typedescriptor");
/**
 * Provides object mapping methods
 */
class ObjectMapper {
    static getTypeDescriptor(obj) {
        let clsid = obj.constructor.prototype['CLSID'];
        if (Utils.isNullOrUndefined(clsid)) {
            clsid = '__TSMAPPER_' + ObjectMapper.typeDescriptors.size;
            obj.constructor.prototype['CLSID'] = clsid;
        }
        if (ObjectMapper.typeDescriptors.has(clsid)) {
            return ObjectMapper.typeDescriptors.get(clsid);
        }
        const descriptor = typedescriptor_1.TypeDescriptor.create(obj);
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
exports.ObjectMapper = ObjectMapper;
ObjectMapper.typeDescriptors = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vYmplY3RtYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtEQUFrRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRCwrQ0FBaUM7QUFDakMscURBQWtEO0FBR2xEOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBR2IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQVE7UUFDckMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUMxRCxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFFRCxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE9BQXVCLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsTUFBTSxVQUFVLEdBQUcsK0JBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQWEsTUFBOEIsRUFBRSxNQUF1QixFQUFFLE9BQWtCO1FBQ3JHLE9BQU8sWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdELENBQUM7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