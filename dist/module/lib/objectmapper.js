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
ObjectMapper.typeDescriptors = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0bWFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9vYmplY3RtYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0RBQWtEO0FBRWxELE9BQU8sS0FBSyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdsRDs7R0FFRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBR2IsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQVE7UUFDckMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxHQUFHLGFBQWEsR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUMxRCxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUM7UUFFRCxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3pDLE9BQXVCLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEQsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBYSxNQUE4QixFQUFFLE1BQWEsRUFBRSxXQUFnQjtRQUN6RixNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzlDLE1BQU0sS0FBSyxHQUFjLE1BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sTUFBTSxHQUFtQixXQUFXLENBQUMsTUFBTSxDQUFDO2dCQUM1QyxXQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFhLE1BQWEsRUFBRSxXQUFnQjtRQUM3RCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdEQsTUFBTSxLQUFLLEdBQWMsTUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLFdBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDOztBQWpFYyw0QkFBZSxHQUFHLElBQUksR0FBRyxFQUEwQixDQUFDIn0=