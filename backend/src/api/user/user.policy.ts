import { NextFunction, Request } from "express";
import IPolicy from '@error-handling/ipolicy.interface';
import PolicyError from '@core/policy.error';
import { UserAuthTransformer } from './user.transformer';
import { UserAuthSrv } from "./user.services";

// example Policy Controller for Smurf
export const UserPolicy = async(req: Request, res: Response, next: any) => {
  const { samplePolicyField } = req.body;

  if (samplePolicyField !== 'hey') {
    const payload: IPolicy = {
      message: 'samplePolicyField is not equal to hey',
      errors:  req.body,
      name: /** any error name */ 'samplePolicyField Error Something'
    }
    const errPolicy = new PolicyError(payload);
    return next(errPolicy);
  }
  next();
}

export const UserAuthPolicy = (req: Request, _res: Response, next: NextFunction) => {
  const payload = UserAuthTransformer(req.body);
  const checkAuth = UserAuthSrv(payload);

  if (!checkAuth) {
    next(new PolicyError({
      message: 'Incorrect Username/Password',
      name: 'UserAuthPolicy'
    }))
  }

  next();
}