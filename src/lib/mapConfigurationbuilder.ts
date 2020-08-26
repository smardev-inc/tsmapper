/* eslint @typescript-eslint/no-explicit-any: 0 */
/*eslint no-use-before-define: ["error", { "classes": false }]*/

import { MapInstructionBuilder, MapConfiguration } from './../index';

export class MapConfigurationBuilder {
    private builders: Set<MapInstructionBuilder> = new Set<MapInstructionBuilder>();

    public map(name: string): MapInstructionBuilder {
        const builder = new MapInstructionBuilder(name);
        this.builders.add(builder);
        return builder;
    }

    public build(): MapConfiguration {
        const result = new MapConfiguration();
        Array.from(this.builders.values()).forEach((p) => result.addInstruction(p.build()));
        return result;
    }
    /*
    public default<TSource, TDestination>(source: Utils.Class<TSource> | undefined, destination: Utils.Class<TDestination>, profile: MapProfile)
    {
        this.map('dummy');
    }
    */
}
