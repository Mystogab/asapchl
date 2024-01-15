import jsonwebtoken from 'jsonwebtoken';
import { expressjwt as jwt } from 'express-jwt';

export const secure = jwt({ secret: 'shhhh', algorithms: ['HS256']});

export const createToken = (payload, secret = 'shhhh') => {
  return jsonwebtoken.sign(payload, secret, { algorithm: 'HS256' });
};
