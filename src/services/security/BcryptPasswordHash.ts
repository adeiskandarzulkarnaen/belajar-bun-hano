import type { password } from 'bun';
import AuthenticationError from '../../exceptions/AuthenticationError';


class BcryptPasswordHash {
  private readonly password;
  private readonly saltRound;
  constructor(bunpassword: typeof password, saltRound: number = 10) {
    this.password = bunpassword;
    this.saltRound = saltRound;
  }

  public async hash(plain: string): Promise<string> {
    const hashedPassword = await this.password.hash(plain, {
      algorithm: 'bcrypt',
      cost: this.saltRound,
    });
    return hashedPassword;
  }

  public async comparePassword(plain: string, hashed: string): Promise<void> {
    const match = await this.password.verify(plain, hashed, 'bcrypt');
    if (!match) throw new AuthenticationError('credendensial tidak sesuai');
  }
};

export default BcryptPasswordHash;
