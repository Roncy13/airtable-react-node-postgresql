export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const defaultStates = () => ({
  data: null,
  success: false,
  loading: false,
  error: false,
});

export const ModelKeyProps = {
  VALUE: 'value',
  VALIDATIONS: 'validation',
  TOUCH: 'touch',
  PASS: 'pass',
};

export const modelProps = {
  [ModelKeyProps.VALUE]: '',
  [ModelKeyProps.VALIDATIONS]: {},
  [ModelKeyProps.TOUCH]: false,
  [ModelKeyProps.PASS]: false,
};

export const ValidationMsg = {
  required: {
    length: {
      minimum: 1,
      tooShort: 'is required',
    },
  },
};
