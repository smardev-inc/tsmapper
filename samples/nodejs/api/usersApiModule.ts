/* eslint @typescript-eslint/no-explicit-any: 0 */

import * as usersData from '../data/users.json';
import { IApiModule } from './apiModule';
import { IApiHandler, ApiHandler } from './apiHandler';
import { ApiResult } from './apiResult';

const apiHandlers: IApiHandler[] = new Array<ApiHandler>();

const getAll = function (): ApiResult {
    return ApiResult.ObjectResult(usersData.data);
};

const getById = function (request: any): ApiResult {
    const id = request.params.userId;

    console.log('UsersApi getById Id:' + id);
    return ApiResult.ObjectResult(usersData.data.find((i: { id: number }) => i.id.toString() === id.toString()));
};

apiHandlers.push(ApiHandler.get('/users', getAll));
apiHandlers.push(ApiHandler.get('/users/:userId', getById));

export class UsersApiModule implements IApiModule {
    handlers = apiHandlers;
    getHandlers(): IApiHandler[] {
        return this.handlers;
    }
}
