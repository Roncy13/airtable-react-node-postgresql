import { apiPath, CheckIfNameIsDirectory, DirectoryTypeFor, RunDirectoryAction } from "../../generator/utils";
import { apiActions } from "../actions";
import { guardActions, policyActions } from "../middlewares";
import { modelActions } from "../models";
import { serviceActions } from "../services";
import { validatorActions } from "../validator";

export const AskDirectoryTypeForApis = DirectoryTypeFor('Apis');

export const GenerateApi =  {
  description: 'Generator For Creating API Component, Smurf.',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Name of Api you want to create.'
    },
    AskDirectoryTypeForApis,
    CheckIfNameIsDirectory(),
  ],
  actions: [
    RunDirectoryAction(),
    ...apiActions,
    ...modelActions,
    ...policyActions,
    ...guardActions,
    ...validatorActions,
    ...serviceActions
  ]
};

export default {
  apiPath,
  AskDirectoryTypeForApis,
  GenerateApi,
};