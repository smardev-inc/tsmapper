/* eslint @typescript-eslint/no-explicit-any: 0 */
import { IObjectMapInstruction, IMapInstructionBuilder, MapProfile } from './../index';
import { AutoMapInstruction } from './automapinstruction';

export class AutoMapInstructionBuilder implements IMapInstructionBuilder {
    public propertyyName: string;
    public profile: MapProfile;

    public constructor(property: string, profile: MapProfile) {
        this.propertyyName = property;
        this.profile = profile;
    }

    public build(): IObjectMapInstruction {
        return new AutoMapInstruction(this.propertyyName, this.profile);
    }
}
