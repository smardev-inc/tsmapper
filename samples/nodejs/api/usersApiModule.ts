/* eslint @typescript-eslint/no-explicit-any: 0 */

import * as usersRepository from '../data/users.json';
import { IApiModule } from './apiModule';
import { IApiHandler, ApiHandler } from './apiHandler';
import { ApiResult } from './apiResult';
import { User } from '../model/model';
import { ObjectMapConfigurationBuilder, ObjectMapper } from '@smardev/tsmapper';

const apiHandlers: IApiHandler[] = new Array<ApiHandler>();

const config = new ObjectMapConfigurationBuilder();
config.map('id').from('id');
config.map('birthDate').from('birthDate');
config.map('email').from('email');
config.map('userName').from('userName');
config.map('fullName').custom((source: any) => source.first_name + ' ' + source.last_name);

const users = ObjectMapper.mapArray<any, User>(config.build(), usersRepository.data, () => new User());

const getAll = function (): ApiResult {
    return ApiResult.ObjectResult(users);
};

const getById = function (request: any): ApiResult {
    const param = request.params.userId;
    const id: number = parseInt(param, 10);

    if (isNaN(id)) {
        return ApiResult.Error(404, 'Invalid argument');
    }

    console.log('UsersApi getById Id:' + id);
    return ApiResult.ObjectResult(users.find((user) => user.id == id.toString()));
};

apiHandlers.push(ApiHandler.get('/users', getAll));
apiHandlers.push(ApiHandler.get('/users/:userId', getById));

export class UsersApiModule implements IApiModule {
    handlers = apiHandlers;
    getHandlers(): IApiHandler[] {
        return this.handlers;
    }
}
