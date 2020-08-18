/* eslint @typescript-eslint/no-explicit-any: 0 */
/* eslint @typescript-eslint/explicit-module-boundary-types: 0 */

import express from 'express';
import * as core from 'express-serve-static-core';
import { IApiModule } from './api/apiModule';

export class ExpressApiAdapter {
    public static initializeModule(module: IApiModule, app: express.Application) {
        const handlers = module.getHandlers();
        handlers.forEach((handler) => {
            const func = function (req: express.Request<core.ParamsDictionary, any, any, core.Query>, res: express.Response<any>) {
                console.log('Executing handler Route: ' + handler.route + ', Http Method: ' + handler.httpMethod);

                const result = handler.requestHandler(req);
                res.status(result.responseCode).send(result.responseData);
            };

            app[handler.httpMethod](handler.route, func);
        });
    }
}
