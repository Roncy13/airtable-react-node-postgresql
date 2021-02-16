import { Request } from "express";
import IPolicy from '@error-handling/ipolicy.interface';
import PolicyError from '@core/policy.error';

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