import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CsvListTableList } from './table-list';

function CsvList({ getList, listData, doResetList }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();

    return () => {
      doResetList();
    };
  }, []);

  useEffect(() => {
    const { success, data } = listData;

    if (success) {
      const { data: list } = listData;
      setList(list.data || []);
    }
  }, [listData]);

  return <CsvListTableList list={list} />;
}

CsvList.propTypes = {
  getList: PropTypes.func.isRequired,
  listData: PropTypes.object.isRequired,
  doResetList: PropTypes.func,
};

export default memo(CsvList);
