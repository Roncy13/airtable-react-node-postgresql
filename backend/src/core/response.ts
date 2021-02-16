import { Request, Response } from "express";
import {
  StatusCodes,
} from 'http-status-codes';
import { HTTP_METHODS } from "@utilities/constants";
import { CheckEmpty } from "@utilities/dataHelper";
import { Schema } from "express-validator";

class ISmurfOptions {
  action: string = '/smurf';
  method?: HTTP_METHODS = HTTP_METHODS.GET;
  status?: StatusCodes = StatusCodes.OK;
  guards?: any[] = [];
  message?: string = "";
  policies?: any[] = [];
  validation?: Schema = null;
}

export default abstract class SmurfResponse extends ISmurfOptions {
    data: any = {};
    inputs: object;
    query: object;
    params: object;
    resp: Response;
    req: Request;

    constructor(args: any) {
      super();
      this.resetInitializers();
      this.initializers(args);
    }

    private initializers(args: {} = {}): void {
      const keys = Object.keys(args);

      keys.forEach(r => {
        if (r in this) {
          (this as any)[r] = (args as any)[r];
        }
      })
    }

    abstract async run(): Promise<void>;

    setResponse(response: Response): void {
      this.resp = response;
    }

    setRequest(request: Request): void {
      this.req = request;
    }

    public resetInitializers() {
      this.message = "";
      this.action = "/";
      this.status = StatusCodes.OK;
      this.method = HTTP_METHODS.GET;
      this.inputs = {};
      this.query = {};
      this.params = {};
      this.data = {};
      this.policies = [];
      this.guards = [];
      this.resp = null;
      this.req = null;
      this.validation = null;
    }

    response(): Response {
      const { data = {}, message, status, resp, req } = this;

      if (CheckEmpty(resp) && CheckEmpty(req)) {
        throw new Error('Response and Request are not set');
      }

      return resp.status(status).json({
        data,
        message,
        statusCode: status
      });
    }
}

export function SmurfAction(options: ISmurfOptions) {
  return function _DecoratorName<T extends new(...args: any[]) => {}>(constr: T){
    return class extends constr {
      constructor(...args: any[]) {
        super({...args, ...options})
      }
    }
  }
}