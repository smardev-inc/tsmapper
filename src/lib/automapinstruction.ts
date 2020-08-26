/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */
/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import { IObjectMapInstruction } from './../index';
import { MapProfile } from './mapprofile';
import { TypeDescriptor } from './typedescriptor';
import * as Utils from './utils';

export class AutoMapInstruction implements IObjectMapInstruction {
    public targetpropertyName: string;
    public profile: MapProfile;

    public constructor(targetProperty: string, profile: MapProfile) {
        this.targetpropertyName = targetProperty;
        this.profile = profile;
    }

    public get propertyName(): string {
        return this.targetpropertyName;
    }

    private static getPropertyValue(
        sourceDescriptor: TypeDescriptor,
        source: any,
        name: string,
        caseSensitive: boolean,
        prefixes: ReadonlyArray<string>
    ): any {
        for (let i = 0; i < prefixes.length; i++) {
            const fullName = prefixes[i] + name;

            const property = sourceDescriptor.getProperty(fullName, caseSensitive);
            if (!Utils.isUndefined(property)) {
                return source[property!.name];
            }

            const field = sourceDescriptor.getField(fullName, caseSensitive);
            if (!Utils.isUndefined(field)) {
                return source[field!.name];
            }

            return undefined;
        }
    }

    public getMappedValue(obj: any): any {
        const descriptor = TypeDescriptor.create(obj);
        const value = AutoMapInstruction.getPropertyValue(descriptor, obj, this.targetpropertyName, this.profile.caseSensitive, ['']);

        const prefixes = this.profile.prefixes;
        if (Utils.isUndefined(value) && prefixes.length > 0) {
            return AutoMapInstruction.getPropertyValue(descriptor, obj, this.targetpropertyName, this.profile.caseSensitive, prefixes);
        } else {
            return value;
        }
    }
}
