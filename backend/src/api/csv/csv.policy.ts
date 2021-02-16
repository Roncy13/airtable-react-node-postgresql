import { Request } from "express";

// example Policy Controller for Smurf
export const CsvPolicy = async(req: Request, res: Response, next: any) => {
  next();
}