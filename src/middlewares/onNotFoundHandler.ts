import { Context } from 'hono';

function onNotFoundHandler(c: Context) {
  return c.json({
    status: 'fail',
    message: 'the requested resource does not exist',
  }, 404);
};

export default onNotFoundHandler;
