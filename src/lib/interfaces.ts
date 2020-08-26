/* eslint @typescript-eslint/no-explicit-any: 0 */

export interface IObjectMapInstruction {
    propertyName: string;
    getMappedValue: (obj: any) => any;
}

export interface IMapInstructionBuilder {
    build: () => IObjectMapInstruction;
}
