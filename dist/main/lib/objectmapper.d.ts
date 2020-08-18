import { ObjectMapConfiguration } from './objectmapconfiguration';
/**
 * Provides object mapping methods
 */
export declare class ObjectMapper {
    private static typeDescriptors;
    private static getTypeDescriptor;
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
    static map<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom | TFrom[], factory: () => TTo): TTo | TTo[];
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
    static mapSingle<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom, factory: () => TTo): TTo;
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
    static mapArray<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom[], factory: () => TTo): Array<TTo>;
    private static mapInternal;
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
    static autoMap<TFrom, TTo>(source: TFrom | TFrom[], factory: () => TTo): TTo | TTo[];
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
    static autoMapArray<TFrom, TTo>(source: TFrom[], factory: () => TTo): TTo[];
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
    static autoMapSingle<TFrom, TTo>(source: TFrom, factory: () => TTo): TTo;
    private static autoMapInternal;
}
