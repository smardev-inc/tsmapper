import { ApiResult } from './apiResult';

export interface IApiHandler {
    httpMethod: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    route: string;
    requestHandler: (request: any) => ApiResult;
}

export class ApiHandler implements IApiHandler {
    public httpMethod: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
    public route: string;
    public requestHandler: (request: any) => ApiResult;

    private constructor(
        httpMethod: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
        route: string,
        requestHandler: (request: any) => ApiResult
    ) {
        this.httpMethod = httpMethod;
        this.route = route;
        this.requestHandler = requestHandler;
    }

    public static all(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('all', route, handler);
    }

    public static get(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('get', route, handler);
    }

    public static post(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('post', route, handler);
    }

    public static put(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('put', route, handler);
    }

    public static delete(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('delete', route, handler);
    }

    public static patch(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('patch', route, handler);
    }

    public static options(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('options', route, handler);
    }

    public static head(route: string, handler: (request: any) => ApiResult): ApiHandler {
        return new ApiHandler('head', route, handler);
    }
}
