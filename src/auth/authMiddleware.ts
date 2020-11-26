import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Request, Response } from 'express';

async function validate(request: Request, response: Response) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.sendStatus(401);
  }

  const [, token] = authorization.split(' ');

  try {
    await promisify(jwt.verify)(token, 'PRIVATEKEY');

    return response.sendStatus(200);
  } catch (err) {
    return response.sendStatus(401);
  }
}

export default validate;