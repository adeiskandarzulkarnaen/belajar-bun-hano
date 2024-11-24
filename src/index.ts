import { Context, Hono } from 'hono';

import notFoundHandler from './middlewares/notFoundHandler';
import errorHandler from './middlewares/errorHandler';
import bearerMiddleware from './middlewares/bearerMiddleware';
import InvariantError from './exceptions/InvariantError';



const app = new Hono();


app.get('/bearer', bearerMiddleware(), (c: Context) => {
  return c.json({
    status:  "success",
    message: "authorized access",
  })
});

app.get('/error', async (c: Context) => {
  throw new InvariantError("invarian error wae");
})



app.notFound(notFoundHandler);
app.onError(errorHandler);
export default app
