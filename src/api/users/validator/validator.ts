/* middleware validator */

import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';


export const postUserValidator = zValidator('json', z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(8).max(100),
}))
