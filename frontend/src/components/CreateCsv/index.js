import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from 'components/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import { SetAllModelToTouched } from 'utils/functions';
import { GetModelValues } from './../../utils/functions';
import { Typography } from '@material-ui/core';

function CreateCsv({ formState, createCsvData, doResetCsv, doCreateCsv }) {
  const [payload, setPayload] = formState;

  useEffect(() => {
    return () => {
      doResetCsv();
    };
  }, []);

  function submit() {
    const result = SetAllModelToTouched(payload, setPayload);

    if (result) {
      const { file } = GetModelValues(payload);

      doCreateCsv(file);
    }
  }

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }} component="div">
              Csv Form
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="File"
              onChange={{ payload, setPayload, field: 'file' }}
              type="file"
              loading={createCsvData.loading}
              accept=".csv"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button loading={createCsvData.loading} color="secondary" label="Submit" onClick={submit} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CreateCsv.propTypes = {
  formState: PropTypes.array.isRequired,
  createCsvData: PropTypes.object.isRequired,
  doResetCsv: PropTypes.func.isRequired,
  doCreateCsv: PropTypes.func.isRequired,
};

export default memo(CreateCsv);
