/* eslint @typescript-eslint/no-explicit-any: 0 */
/*eslint no-use-before-define: ["error", { "classes": false }]*/

import * as Utils from './utils';
import { MapInstructionBuilder, MapConfiguration, TypeRef } from '../index';
import { MapProfile } from './mapprofile';
import { Strings } from './strings';

export class MapConfigurationBuilder {
    private builders: Set<MapInstructionBuilder> = new Set<MapInstructionBuilder>();
    private static defaultMapProfile: MapProfile = new MapProfile();

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

    public defaultFromTarget<TTarget>(target: TypeRef<TTarget>, profile: MapProfile | undefined = undefined): void {
        if (Utils.isNullOrUndefined(target)) {
            throw new Error(Strings.argumentNullException('target'));
        }

        if (Utils.isNullOrUndefined(profile)) {
            profile = MapConfigurationBuilder.defaultMapProfile;
        }

        this.map('dummy');
    }

    public default<TSource, TTarget>(
        source: TypeRef<TSource> | undefined,
        target: TypeRef<TTarget>,
        profile: MapProfile | undefined = undefined
    ): void {
        if (Utils.isNullOrUndefined(source)) {
            return this.defaultFromTarget<TTarget>(target, profile);
        }

        throw new Error('NOT IMPLEMENTED');
    }
}
