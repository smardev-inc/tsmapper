export interface IObjectMapInstruction {
    propertyName: string;
    getMappedValue: (obj: any) => any;
}
export declare class MapperBuilder {
    private sourcePropertyName;
    private mapper;
    constructor(sourcePropertyName: string);
    custom(mapper: (propertyValue: any) => any): void;
    build(): (obj: any) => any;
}
export declare class MapInstructionBuilder {
    propertyyName: string;
    mapperBuilder: MapperBuilder | undefined;
    mapper: ((obj: any) => any) | undefined;
    constructor(property: string);
    from(propertyName: string): MapperBuilder;
    custom(mapper: (obj: any) => any): void;
    build(): IObjectMapInstruction;
}
export declare class ObjectMapConfiguration {
    private instructions;
    addInstruction(value: IObjectMapInstruction): void;
    get mappingInstructions(): IObjectMapInstruction[];
}
export declare class ObjectMapConfigurationBuilder {
    private builders;
    map(name: string): MapInstructionBuilder;
    build(): ObjectMapConfiguration;
}
