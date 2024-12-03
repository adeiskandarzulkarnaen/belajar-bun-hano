import { Context } from "hono";
import { Container } from "instances-container";
import type UserService from "../../services/database/UserPrismaService";
import type BcryptPasswordHash from "../../services/security/BcryptPasswordHash";


// validasi entitas
import eNewUser from "./entities/eNewUser";



class UserHandler {
  private readonly userService: UserService;
  private readonly passwordHash: BcryptPasswordHash;
  constructor(container: Container) {
    this.userService = container.getInstance('UserDatabaseService');
    this.passwordHash = container.getInstance('PasswordHash')
  }

  public postUserHandlers = [ eNewUser, async (c: Context) => {
    const { username, password, fullname } = c.req.valid('json');

    await this.userService.verifyAvailableUsername(username);
    const hashedPassword = await this.passwordHash.hash(password);

    const { id: userId, } = await this.userService.addUser({
      username,
      password: hashedPassword,
      fullname,
    });

    return c.json({
      status: "success",
      message: "berhasil menambahkan user",
      data: {
        username,
      }
    }, 201);
  }];
};

export default UserHandler;
