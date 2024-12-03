// import lib
import { Hono } from 'hono';

// impor middleware
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';

import onNotFoundHandler from './middlewares/onNotFoundHandler';
import onErrorHandler from './middlewares/onErrorHandler';
import bearerMiddleware from './middlewares/bearerMiddleware';


// import routes
import userRoutes from './api/users/index';



/********************************************************************* */
/****************************[ main program ]************************* */
const app = new Hono();
import container from './container';

// * GLOBAL MIDDLEWARE
app.use(cors());
app.use(secureHeaders());


// * ROUTING
app.route('/users', userRoutes(container));


// * GLOBAL ERROR HANDLING
app.notFound(onNotFoundHandler);
app.onError(onErrorHandler);

export default {
  port: process.env.APP_PORT || 3000,
  fetch: app.fetch,
};
