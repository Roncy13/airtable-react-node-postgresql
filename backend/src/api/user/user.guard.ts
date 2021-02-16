import GuardError from "@core/guard.error";
import IGuard from "@error-handling/iguard.interface";
import { Request } from "express";

export const UserGuard = (req: Request, res: Response, next: any) => {
  // tslint:disable-next-line:no-console
  console.log('Implement like Policy Sample in user, difference is it will just be execute first before validation and policies');
  const { sampleGuardField } = req.body;

  if (sampleGuardField !== 'hey') {
    const payload: IGuard = {
      message: 'sample Field Guard is not equal to hey',
      errors:  req.body,
      name: /** any error name */ 'Sample Field Guard Error Something'
    }
    const errPolicy = new GuardError(payload);
    return next(errPolicy);
  }
  next();
}
