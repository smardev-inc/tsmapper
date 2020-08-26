/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

import { IObjectMapInstruction } from './../index';

export class MapInstruction implements IObjectMapInstruction {
    public targetpropertyName: string;
    public mapper: (obj: any) => any;

    public constructor(targetProperty: string, mapper: (obj: any) => any) {
        this.targetpropertyName = targetProperty;
        this.mapper = mapper;
    }

    public get propertyName(): string {
        return this.targetpropertyName;
    }

    public getMappedValue(obj: any): any {
        return this.mapper(obj);
    }
}
