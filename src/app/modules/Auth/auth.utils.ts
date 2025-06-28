import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

type TokenPayload = {
  userEmail: string;
  role: string;
};

export const createToken = (
  jwtPayload: TokenPayload,
  secret: string,
  expiresIn: string
): string => {
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
