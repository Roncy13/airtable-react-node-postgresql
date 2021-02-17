import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import CsvList from 'components/CsvList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCsv, createCsv, resetCreateCsv, resetListCsv } from './actions';
import { selectCreateCsv, selectCsv } from './selectors';
import { modelProps, ValidationMsg } from 'utils/constants';

const models = {
  file: {
    ...modelProps,
    value: '',
    validations: {
      ...ValidationMsg.required,
    },
  },
};

export function Home(props) {
  const formState = useState({ ...models });
  const { getList, listData, doResetList } = props;

  return (
    <CsvList listData={listData} getList={getList} doResetList={doResetList} />
  );
}

const mapStateToProps = createStructuredSelector({
  createCsvData: selectCreateCsv(),
  listData: selectCsv(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getShowcases: () => dispatch(getShowcases()),
    getList: payload => dispatch(getCsv(payload)),
    doCreateCsv: () => dispatch(createCsv()),
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
