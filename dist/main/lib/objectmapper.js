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
        const descriptor = typedescriptor_1.TypeDescriptor.Create(obj);
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
    static map(config, source, destination) {
        config.mappingInstructions.forEach((instruction) => {
            if (!Utils.isNullOrUndefined(instruction.target)) {
                const value = source[instruction.name];
                const target = instruction.target;
                destination[target] = value;
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
    static autoMap(source, destination) {
        const descriptor = ObjectMapper.getTypeDescriptor(source);
        Array.from(descriptor.propertyNames).forEach((propName) => {
            const value = source[propName];
            destination[propName] = value;
        });
        return destination;
    }
}
exports.ObjectMapper = ObjectMapper;
ObjectMapper.typeDescriptors = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vYmplY3RtYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtEQUFrRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRCwrQ0FBaUM7QUFDakMscURBQWtEO0FBR2xEOztHQUVHO0FBQ0gsTUFBYSxZQUFZO0lBR2IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQVE7UUFDckMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUMxRCxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFFRCxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE9BQXVCLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsTUFBTSxVQUFVLEdBQUcsK0JBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNJLE1BQU0sQ0FBQyxHQUFHLENBQWEsTUFBOEIsRUFBRSxNQUFhLEVBQUUsV0FBZ0I7UUFDekYsTUFBTSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUM5QyxNQUFNLEtBQUssR0FBYyxNQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxNQUFNLE1BQU0sR0FBbUIsV0FBVyxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsV0FBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN0QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBYSxNQUFhLEVBQUUsV0FBZ0I7UUFDN0QsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RELE1BQU0sS0FBSyxHQUFjLE1BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxXQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQzs7QUFsRUwsb0NBbUVDO0FBbEVrQiw0QkFBZSxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDIn0=