export declare class ObjectMapInstruction {
    name: string;
    target: string | undefined;
    constructor(name: string);
    to(name: string): void;
}
export declare class ObjectMapConfiguration {
    private instructions;
    mapProperty(name: string): ObjectMapInstruction;
    get mappingInstructions(): ObjectMapInstruction[];
}
