import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';


const authLoginSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
});


const eNewAuth = zValidator('json', authLoginSchema, (result, c) => {
  if (!result.success) {
    console.log(result.error.message)
    return c.text('Invalid!', 400)
  }
});

export default eNewAuth;
