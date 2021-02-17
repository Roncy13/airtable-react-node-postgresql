import React, { useEffect, useState } from 'react';
import TextInput from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import validatejs from 'validate.js';
import {
  GetFrstErrValue,
  NotEmpty,
  SetModelToFail,
  SetModelToSuccess,
  SetModelToTouched,
  SetModelValue,
} from 'utils/functions';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  })
);

function TextField(props) {
  const {
    type = 'text',
    label = 'Your Custom Text Input',
    variant = 'outlined',
  } = props;
  const { payload, setPayload, field } = props.onChange;
  const [errorMsg, setErrorMsg] = useState('');
  const className = styles();

  useEffect(() => {
    getErrors();
  }, [payload[field].value, payload[field].touch]);

  function getErrors() {
    if (payload[field] && payload[field].touch) {
      const { validations = {}, value } = payload[field];
      const key = { [field]: value };
      const validateConfig = { [field]: validations };

      const result = validatejs(key, validateConfig);

      if (NotEmpty(result)) {
        const msg = GetFrstErrValue(result);

        setErrorMsg(msg);
        SetModelToFail(payload, setPayload, field);
      } else {
        setErrorMsg('');
        SetModelToSuccess(payload, setPayload, field);
      }
    }
  }

  return (
    <TextInput
      label={label}
      type={type}
      error={NotEmpty(errorMsg)}
      helperText={errorMsg}
      variant={type !== 'file' ? variant : 'standard'}
      InputProps={{ disableUnderline: type !== 'file' ? false : true }}
      onClick={() => SetModelToTouched(payload, setPayload, field)}
      onChange={({ target }) => {
        SetModelValue(
          payload,
          setPayload,
          field,
          type === 'file' ? target.files[0] : target.value
        );
      }}
      className={className.root}
    />
  );
}

TextField.propTypes = {
  onChange: PropTypes.shape({
    payload: PropTypes.object,
    setPayload: PropTypes.func,
    field: PropTypes.string.isRequired,
  }),
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  type: PropTypes.string,
};

export default TextField;
