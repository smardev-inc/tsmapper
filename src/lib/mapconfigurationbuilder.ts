/* eslint @typescript-eslint/no-explicit-any: 0 */
/*eslint no-use-before-define: ["error", { "classes": false }]*/

import * as Utils from './utils';
import { MapInstructionBuilder, MapConfiguration, TypeRef, IMapInstructionBuilder } from '../index';
import { MapProfile } from './mapprofile';
import { AutoMapInstructionBuilder } from './automapinstructionbuilder';
import { TypeDescriptor } from './typedescriptor';
import { Strings } from './strings';

const defaultMapProfile = () => {
    const result = new MapProfile();
    result.caseSensitive = false;
    result.usePrefixes('m_');

    return result;
};

export class MapConfigurationBuilder {
    private builders: Set<IMapInstructionBuilder> = new Set<IMapInstructionBuilder>();
    private static defaultMapProfile: MapProfile = defaultMapProfile();

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

        const targetInstance = new target();
        const descriptor = TypeDescriptor.create(targetInstance);
        Array.from(descriptor.propertyNames).forEach((name) => {
            const builder = new AutoMapInstructionBuilder(name, <MapProfile>profile);
            this.builders.add(builder);
        });
    }

    public default<TSource, TTarget>(
        source: TypeRef<TSource> | undefined,
        target: TypeRef<TTarget>,
        profile: MapProfile | undefined = undefined
    ): void {
        if (Utils.isNullOrUndefined(source)) {
            this.defaultFromTarget<TTarget>(target, profile);
        }
    }
}
