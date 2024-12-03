import { Hono } from "hono";
import { Container } from "instances-container";
import AuthHandler from "./handler";



const authRoutes = (container: Container): Hono => {
  const app = new Hono();
  const authHandler = new AuthHandler(container);

  // * routes
  app.post('/auth', ...authHandler.postAuthHandlers);


  return app;
}

export default authRoutes;
