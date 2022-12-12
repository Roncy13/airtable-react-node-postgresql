import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CsvList from 'components/CsvList';
import CreateCsv from 'components/CreateCsv';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCsv, createCsv, resetCreateCsv, resetListCsv } from './actions';
import { selectCreateCsv, selectCsv } from './selectors';
import { modelProps } from 'utils/constants';
import { Box } from '@material-ui/core';
import { isObject } from 'lodash';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

const models = {
  file: {
    ...modelProps,
    value: '',
    validations: {
      type: {
        type: function(value) {
          return isObject(value);
        },
      },
    },
  },
};

export function Home(props) {
  const [payload, setPayload] = useState({ ...models });
  const formState = [payload, setPayload];
  const startDate = new Date();
  const [requestAfter5Secs, setRequestAfter5Secs] = useState(null);
  const [timer, setTimer] = useState(startDate);
  const {
    getList,
    listData,
    doResetList,
    doCreateCsv,
    createCsvData,
    doResetCsv,
  } = props;

  // function for refreshing the page, getting the details of csv creation
  useEffect(() => {
    const checkDateRequested =
      moment(timer).format('YYYYMMDDhh:mm:ss') ===
      moment(requestAfter5Secs).format('YYYYMMDDhh:mm:ss');

    if (checkDateRequested) {
      getList();
    }
  }, [timer]);

  useEffect(() => {
    getList();
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 10000);

    return () => {
      clearInterval(interval);
      doResetList();
    };
  }, []);

  useEffect(() => {
    const { success } = listData;

    if (success) {
      const add5Seconds = moment()
        .add(5, 'seconds')
        .toDate();

      setRequestAfter5Secs(add5Seconds);
    }
  }, [listData]);

  useEffect(() => {
    const { success, data: payload } = createCsvData;

    if (success) {
      toastr.success(payload.message);
      setPayload({ ...models });
    }
  }, [createCsvData]);

  useEffect(() => {
    const { success, data: payload } = createCsvData;

    if (success) {
      toastr.success(payload.message);
      setPayload({ ...models });
    }
  }, [createCsvData]);

  return (
    <Box display="flex" flexDirection="column">
      {createCsvData.success ? (
        <></>
      ) : (
        <CreateCsv
          doCreateCsv={doCreateCsv}
          createCsvData={createCsvData}
          doResetCsv={doResetCsv}
          formState={formState}
        />
      )}
      <Box mt={2}>
        <CsvList
          listData={listData}
          getList={getList}
          doResetList={doResetList}
        />
      </Box>
    </Box>
  );
}

const mapStateToProps = createStructuredSelector({
  createCsvData: selectCreateCsv(),
  listData: selectCsv(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getList: payload => dispatch(getCsv(payload)),
    doCreateCsv: payload => dispatch(createCsv(payload)),
    doResetCsv: () => dispatch(resetCreateCsv()),
    doResetList: () => dispatch(resetListCsv()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Home.propTypes = {
  getList: PropTypes.func,
  doCreateCsv: PropTypes.func,
  doResetCsv: PropTypes.func,
  router: PropTypes.object,
  listData: PropTypes.object,
  createCsvData: PropTypes.object,
  doResetList: PropTypes.func,
};

export default compose(withConnect, memo)(Home);
