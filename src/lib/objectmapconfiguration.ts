/* eslint @typescript-eslint/no-explicit-any: 0 */
/*eslint no-use-before-define: ["error", { "classes": false }]*/

import * as Utils from './utils';

export interface IObjectMapInstruction {
    propertyName: string;
    getMappedValue: (obj: any) => any;
}

class MapIntruction implements IObjectMapInstruction {
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

export class MapperBuilder {
    private sourcePropertyName: string;
    private mapper: ((obj: any) => any) | undefined;

    public constructor(sourcePropertyName: string) {
        this.sourcePropertyName = sourcePropertyName;
    }

    public custom(mapper: (propertyValue: any) => any): void {
        this.mapper = mapper;
    }

    public build(): (obj: any) => any {
        const propName = this.sourcePropertyName;
        if (this.mapper) {
            const mapper = this.mapper;
            return function (obj: any): any {
                const sourceValue = obj[propName];
                return mapper(sourceValue);
            };
        } else {
            return function (obj: any): any {
                return obj[propName];
            };
        }
    }
}

export class MapInstructionBuilder {
    public propertyyName: string;
    public mapperBuilder: MapperBuilder | undefined;
    public mapper: ((obj: any) => any) | undefined;

    public constructor(property: string) {
        this.propertyyName = property;
    }

    public from(propertyName: string): MapperBuilder {
        this.mapperBuilder = new MapperBuilder(propertyName);
        return this.mapperBuilder;
    }

    public custom(mapper: (obj: any) => any): void {
        this.mapper = mapper;
    }

    public build(): IObjectMapInstruction {
        if (Utils.isUndefined(this.mapper)) {
            const mapper = <(obj: any) => any>this.mapperBuilder?.build();
            return new MapIntruction(this.propertyyName, mapper);
        } else {
            return new MapIntruction(this.propertyyName, <(obj: any) => any>this.mapper);
        }
    }
}

export class ObjectMapConfiguration {
    private instructions: Set<IObjectMapInstruction> = new Set<IObjectMapInstruction>();

    public addInstruction(value: IObjectMapInstruction): void {
        this.instructions.add(value);
    }

    public get mappingInstructions(): IObjectMapInstruction[] {
        return Array.from(this.instructions.values());
    }

    public static create(config: (builder: ObjectMapConfigurationBuilder) => void): ObjectMapConfiguration {
        const builder = new ObjectMapConfigurationBuilder();
        config(builder);

        return builder.build();
    }
}

export class ObjectMapConfigurationBuilder {
    private builders: Set<MapInstructionBuilder> = new Set<MapInstructionBuilder>();

    public map(name: string): MapInstructionBuilder {
        const builder = new MapInstructionBuilder(name);
        this.builders.add(builder);
        return builder;
    }

    public build(): ObjectMapConfiguration {
        const result = new ObjectMapConfiguration();
        Array.from(this.builders.values()).forEach((p) => result.addInstruction(p.build()));
        return result;
    }
}
