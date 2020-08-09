/* eslint @typescript-eslint/no-explicit-any: 0 */

/**
 * Provides object mapping methods
 */
export class ObjectMapper {
    public static map<TFrom, TTo>(source: TFrom): TTo {
        // this one is ugly, but apparently is the only way to create the new instance
        // from the generic type without triggering a tslint error
        const result: TTo = ({} as unknown) as TTo;

        // loop trough all properties
        for (const key of Object.keys(source)) {
            ObjectMapper.internalMap(source, result, key);
        }

        return result;
    }

    private static internalMap(source: any, destination: any, sourcePropName: string): void {
        destination[sourcePropName] = source[sourcePropName];
    }
}
