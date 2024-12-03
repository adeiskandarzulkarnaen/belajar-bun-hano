import { Hono } from 'hono';
import { Container } from 'instances-container';
import UserHandler from './handler';


const userRoutes = (container: Container): Hono => {
  const app = new Hono();
  const userHandler = new UserHandler(container);

  // * routes
  app.post('/', ...userHandler.postUserHandlers);


  return app;
}

export default userRoutes;
