import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CsvListTableList } from './table-list';

function CsvList({ listData }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const { success } = listData;

    if (success) {
      const { data: list } = listData;

      setList(list.data || []);
    }
  }, [listData]);

  return <CsvListTableList list={list} loading={listData.loading} />;
}

CsvList.propTypes = {
  getList: PropTypes.func.isRequired,
  listData: PropTypes.object.isRequired,
  doResetList: PropTypes.func,
};

export default memo(CsvList);
