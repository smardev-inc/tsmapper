import express from 'express';
import { initializeApi } from './api';
import { ExpressApiAdapter } from './expressApiAdapter';

// Create a new express app instance
const app: express.Application = express();

initializeApi((module) => ExpressApiAdapter.initializeModule(module, app));

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});
