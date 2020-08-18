import * as usersData from '../data/users.json';
import { IApiModule } from './apiModule';
import { IApiHandler, ApiHandler } from './apiHandler';
import { ApiResult } from './apiResult';

export class UsersApiModule implements IApiModule {
    getHandlers(): IApiHandler[] {
        return apiHandlers;
    }
}

const getAll = function (request: any): ApiResult {
    return ApiResult.ObjectResult(usersData.data);
};

const getById = function (request: any): ApiResult {
    const id = request.params.userId;

    console.log('UsersApi getById Id:' + id);
    return ApiResult.ObjectResult(usersData.data.find((i: { id: number }) => i.id.toString() === id.toString()));
};

const apiHandlers: IApiHandler[] = new Array<ApiHandler>();
apiHandlers.push(ApiHandler.get('/users', getAll));
apiHandlers.push(ApiHandler.get('/users/:userId', getById));
