/* eslint @typescript-eslint/no-explicit-any: 0 */
/*eslint no-use-before-define: ["error", { "classes": false }]*/

import { IObjectMapInstruction, MapConfigurationBuilder } from './../index';

export class MapConfiguration {
    private instructions: Set<IObjectMapInstruction> = new Set<IObjectMapInstruction>();

    public addInstruction(value: IObjectMapInstruction): void {
        this.instructions.add(value);
    }

    public get mappingInstructions(): IObjectMapInstruction[] {
        return Array.from(this.instructions.values());
    }

    public static create(config: (builder: MapConfigurationBuilder) => void): MapConfiguration {
        const builder = new MapConfigurationBuilder();
        config(builder);

        return builder.build();
    }
}
