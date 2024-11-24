import { Context, Hono } from "hono";
import { Container } from "instances-container";

// middleware

import postAuthValidator from './validator/postAuthValidator';



const authRoutes = (container: Container): Hono {
  const app = new Hono();


  app.post('/auth', postAuthValidator, async (c: Context) => {

    return c.json({
      status: "success",
      message: "berhasil login",
      data: {
        acessToken: "ini token"
      }
    }, 201);
  });


  return app;
}

export default authRoutes;
