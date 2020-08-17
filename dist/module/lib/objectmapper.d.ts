import { ObjectMapConfiguration } from './objectmapconfiguration';
/**
 * Provides object mapping methods
 */
export declare class ObjectMapper {
    private static typeDescriptors;
    private static getTypeDescriptor;
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
    static map<TFrom, TTo>(config: ObjectMapConfiguration, source: TFrom, destination: TTo): TTo;
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
    static autoMap<TFrom, TTo>(source: TFrom, destination: TTo): TTo;
}
