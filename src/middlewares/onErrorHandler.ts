import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ClientError from '../exceptions/ClientError';

async function onErrorHandler(err: Error, c: Context) {
  if (err instanceof ClientError) {
    return c.json({
      status: 'fail',
      message: err.message,
    }, err.status);
  }

  if (err instanceof HTTPException) {
    return c.json({
      status: 'fail',
      message: err.message,
    }, err.status);
  }

  console.error('Unhandled error:', err.message);
  return c.json({
    status: 'error',
    message: 'terjadi kesalahan pada server kami',
  }, 500);
}

export default onErrorHandler;
