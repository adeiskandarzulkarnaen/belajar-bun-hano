import { Context } from "hono";
import { Container } from "instances-container";
import eNewAuth from "./entities/eNewAuth";


class AuthHandler {
  constructor(private readonly container: Container){
    // do anything
  }

  public postAuthHandlers = [ eNewAuth, async (c: Context) => {
    return c.json({
      status: "success",
      message: "berhasil login",
      data: {
        acessToken: "ini token"
      }
    }, 201);
  }]
};

export default AuthHandler;
