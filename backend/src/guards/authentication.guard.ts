import GuardError from "@core/guard.error";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

export const AuthenticateTokenGuard = async (req: Request, res: Response, next: NextFunction) =>{
  const bearerHeader = (req.headers.authorization || req.query.authorization as string) ?? '';
  console.log(bearerHeader, ' headers');
  const token = bearerHeader.split(' ')[1] ?? null;
  const errPolicy = new GuardError({
    message: 'You are not log in',
    errors: "Error Token",
    name: 'No access',
    statusCode: StatusCodes.FORBIDDEN
  });
  console.log(token)
  if (token == null) {
    return next(errPolicy);
  }

  const decode = jwt.decode(token) as any;
  console.log(decode, 'decode');
  if (!(decode?.username ?? false)) {
    return next(errPolicy);
  }

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err: any, user: any) => {

    if (err) {
      return next(errPolicy);
    }

    const details = {
      userAgent: req.headers["user-agent"],
      ip: req.header('x-forwarded-for') || req.connection.remoteAddress
    }

    res.locals = {...user, ...details};

    next();
  });
}
