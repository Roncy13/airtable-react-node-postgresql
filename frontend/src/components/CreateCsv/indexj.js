import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CsvListTableList } from './table-list';

function CreateCsv({ getList, listData, doResetList }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();

    return () => {
      doResetList();
    };
  }, []);

  useEffect(() => {
    const { success, data: list } = listData;

    if (success) {
      setList(list.data || []);
    }
  }, [listData]);

  return <CreateCsvTableList list={list} />;
}

CreateCsv.propTypes = {
  getList: PropTypes.func.isRequired,
  listData: PropTypes.object.isRequired,
  doResetList: PropTypes.func,
};

export default memo(CreateCsv);
