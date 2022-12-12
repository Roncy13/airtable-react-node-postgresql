import { CheckEmpty } from "@utilities/dataHelper";
import { Request } from "express";
import IPolicy from './../../error-types/ipolicy.interface';
import Validator from 'validatorjs';
import { UploadedFile } from 'express-fileupload';
import { last } from "lodash";
import { ConvertCsvToJson } from "./csv.services";
import { VARCHAR_STR } from "@utilities/constants";
import PolicyError from './../../core/policy.error';

// example Policy Controller for Smurf
export const CsvCheckFilePolicy = async(req: Request, res: Response, next: any) => {

  if (CheckEmpty(req.files)) {
    const payload: IPolicy = {
      message: 'No File has been submitted',
      name: 'EmptyFiles'
    };
    const emptyFile = new PolicyError(payload);
    return next(emptyFile);
  }

  const file = req.files.file as UploadedFile;

  if (CheckEmpty(file)) {
    const payload: IPolicy = {
      message: 'File csv does not exist',
      name: 'FileNotExist'
    };
    const emptyFile = new PolicyError(payload);
    return next(emptyFile);
  }

  const extension = last(file.name.split("."));

  if (extension !== 'csv') {
    const payload: IPolicy = {
      message: 'File csv does not exist',
      name: 'FileNotCsv'
    };
    const NotCsvPolicy = new PolicyError(payload);
    return next(NotCsvPolicy);
  }

  next();
}

export const CsvCheckRowsPolicy = async(req: Request, res: Response, next: any) => {
  const file = req.files.file as UploadedFile;

  const json = await ConvertCsvToJson(file);

  if (json.length === 0) {
    const payload: IPolicy = {
      message: `CSV fils is Empty`,
      name: 'CsvCheckRowsPolicy'
    };
    const CheckCsvValusPolicy = new PolicyError(payload);

    return next(CheckCsvValusPolicy);
  }

  const rules = {
    'csv.*.firstname': `required|string|max:${VARCHAR_STR.MAX_LENGTH}`,
    'csv.*.lastname': `required|string|max:${VARCHAR_STR.MAX_LENGTH}`,
    'csv.*.ccnumber': `required|string|max:${VARCHAR_STR.MAX_LENGTH}`,
    'csv.*.email': `required|string|email|max:${VARCHAR_STR.MAX_LENGTH}`,
  };

  const validation = new Validator({ csv: json }, rules);
  const checkResult = validation.passes();
  if (!checkResult) {
    const err = validation.errors.all();
    const keyErr = Object.keys(err);
    const firstError = err[keyErr[0]][0];

    const payload: IPolicy = {
      message: `Something wrong in the CSV file data values: ${firstError}`,
      name: 'CsvCheckRowsPolicy'
    };
    const CheckCsvValusPolicy = new PolicyError(payload);

    return next(CheckCsvValusPolicy);
  }




  next();
}