import { inBody, inQuery } from '@utilities/constants';
import { Schema }  from 'express-validator';
import { CheckIfHeaderExist } from './csv.services';


export const CsvSchema: Schema = {
  sampleFieldName: {
    ...inBody,
    isLength: {
      errorMessage: 'Field Name should be not less than 1 and not greater than 50 characters',
      options: {
        min: 1,
        max: 50,
      }
    }
  }
};

export const CsvDetailsPageSchema: Schema = {
  header: {
    ...inQuery,
    isLength: {
      errorMessage: 'header field is required',
      options: {
        min: 1,
      }
    },
    isUUID: {
      errorMessage: 'header should be a valid uuid',
    },
    custom: {
      options: async (value) => {
        return await CheckIfHeaderExist(value);
      },
      errorMessage: 'header is not existing'
    },
  },
  page: {
    ...inQuery,
    isLength: {
      errorMessage: 'page field is required',
      options: {
        min: 1,
      }
    },
    isInt: {
      errorMessage: 'Page should be a number and greater than 0',
      options: {
        gt: 0
      }
    },
    customSanitizer: {
      options: (value) => Number(value)
    }
  }
};