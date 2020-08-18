import { UsersApiModule } from './usersApiModule';
import { IApiModule } from './apiModule';

export const initializeApi = function (moduleRegistration: (module: IApiModule) => void): void {
    const usersApi = new UsersApiModule();
    moduleRegistration(usersApi);
};
