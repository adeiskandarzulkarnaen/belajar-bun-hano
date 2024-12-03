import type { PrismaClient } from "@prisma/client";
import InvariantError from "../../exceptions/InvariantError";

class UserPrismaService {
  private prismaClient: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async verifyAvailableUsername(username: string): Promise<void> {
    const result = await this.prismaClient.user.findFirst({
      where: { username }
    });
    if (result) throw new InvariantError("Usernam sudah digunakan");
  }

  async addUser(payload: { username: string, password: string, fullname: string }): Promise<{ username: string, id: string, fullname: string }> {
    const { username, password, fullname } = payload;

    const result = await this.prismaClient.user.create({
      data: { username, password, fullname },
      select: {
        id: true, username: true, fullname: true
      }
    });

    return result;
  }
};

export default UserPrismaService;

