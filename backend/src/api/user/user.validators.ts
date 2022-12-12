import { inBody, inParam } from '@utilities/constants';
import { Schema }  from 'express-validator';

export const UserSchema: Schema = {
  firstName: {
    ...inBody,
    isLength: {
      errorMessage: 'First Name should be not less than 1 and not greater than 50 characters',
      options: {
        min: 1,
        max: 50,
      }
    }
  },
  lastName: {
    ...inBody,
    isLength: {
      errorMessage: 'First Name should be not less than 1 and not greater than 50 characters',
      options: {
        min: 1,
        max: 50,
      }
    }
  }
};

export const UserAuthSchema: Schema = {
  username: {
    ...inBody,
    notEmpty: true
  },
  password: {
    ...inBody,
    notEmpty: true
  },
}

export const UserByIdSchema: Schema = {
  id: {
    ...inParam,
    isLength: {
      errorMessage: 'id should exist',
      options: {
        min: 1,
      }
    },
    isUUID: {
      errorMessage: 'id should be UUID'
    }
  }
};

export const UserUpdateSchema: Schema = {
  ...UserSchema,
  ...UserByIdSchema,
};