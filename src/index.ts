/* eslint @typescript-eslint/no-explicit-any: 0 */

export { ObjectMapper } from './lib/objectmapper';
export * from './lib/interfaces';
export { MapBuilder } from './lib/mapbuilder';
export { MapInstruction } from './lib/mapinstruction';
export { MapInstructionBuilder } from './lib/mapinstructionbuilder';
export { MapConfiguration } from './lib/mapconfiguration';
export { MapConfigurationBuilder } from './lib/mapconfigurationbuilder';
export { MapProfile } from './lib/mapprofile';

export type TypeRef<T> = new (...args: any[]) => T;
