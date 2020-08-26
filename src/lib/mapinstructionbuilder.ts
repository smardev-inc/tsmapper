/* eslint @typescript-eslint/no-explicit-any: 0 */

import * as Utils from './utils';
import { MapBuilder, IObjectMapInstruction, MapInstruction } from './../index';

export class MapInstructionBuilder {
    public propertyyName: string;
    public mapBuilder: MapBuilder | undefined;
    public mapper: ((obj: any) => any) | undefined;

    public constructor(property: string) {
        this.propertyyName = property;
    }

    public from(propertyName: string): MapBuilder {
        this.mapBuilder = new MapBuilder(propertyName);
        return this.mapBuilder;
    }

    public custom(mapper: (obj: any) => any): void {
        this.mapper = mapper;
    }

    public build(): IObjectMapInstruction {
        if (Utils.isUndefined(this.mapper)) {
            const mapper = <(obj: any) => any>this.mapBuilder?.build();
            return new MapInstruction(this.propertyyName, mapper);
        } else {
            return new MapInstruction(this.propertyyName, <(obj: any) => any>this.mapper);
        }
    }
}
