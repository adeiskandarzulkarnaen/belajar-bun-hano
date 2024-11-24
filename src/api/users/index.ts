import { Context, Hono } from 'hono';
import { Container } from 'instances-container';
import UserService from '../../services/database/UserService';


const userRoutes = (container: Container): Hono => {
  const app = new Hono();
  const userService: UserService = container.getInstance('UserService');


  app.post('/user', async (c: Context) => {
    const { username, password, fullname } = c.req.valid('json');

    await userService.verifyAvailableUsername(username);
    // const hashedPassword = passwordHash(plainPassword);

    const { id: userId, } = await userService.addUser({
      username, password, fullname
    });

    return c.json({
      status: "success",
      message: "berhasill hore",
      data: {
        userId,
        username,
        password,
      }
    }, 201);
  });


  return app;
}





export default userRoutes;
