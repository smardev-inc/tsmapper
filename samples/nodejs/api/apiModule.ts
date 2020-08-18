import { IApiHandler } from './apiHandler';

export interface IApiModule {
    getHandlers(): IApiHandler[];
}
