import React, { memo, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

import PropTypes from 'prop-types';
import TextField from 'components/TextField';
import Typography from 'components/Typography';
import Button from 'components/Button';
import { GetModelValues, SetAllModelToTouched } from '../../utils/functions';
import { makeStyles } from '@material-ui/core/styles';
import { toastr } from 'react-redux-toastr';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

function CsvPage({ resetLogin, login, formState, router, doLogin }) {
  const classes = useStyles();
  const [payload, setPayload] = formState;

  useEffect(() => {
    const { loading } = login;

    if (loading) {
      resetLogin();
    }
  }, []);

  useEffect(() => {
    const { success, data } = login;

    if (success) {
      const { message } = data;
      toastr.success(message);
      redirect();
    }
  }, [login]);

  function submit() {
    const result = SetAllModelToTouched(payload, setPayload);

    if (result) {
      const data = GetModelValues(payload);

      doLogin(data);
    }
  }

  function redirect() {
    router.push('/dashboard');
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography label="Login Form" variant="h4" bold />
          <TextField
            label="Username"
            onChange={{ payload, setPayload, field: 'username' }}
            loading={login.loading}
          />
          <TextField
            label="Password"
            onChange={{ payload, setPayload, field: 'password' }}
            type="password"
            loading={login.loading}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Button
            loading={login.loading}
            color="secondary"
            label="Sign In"
            onClick={submit}
          />
        </Box>
      </CardActions>
    </Card>
  );
}

CsvPage.propTypes = {
  formState: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
  doLogin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired,
  resetLogin: PropTypes.func.isRequired,
};

export default memo(CsvPage);
