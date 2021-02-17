import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';

const STATUS_TYPES = {
  GENERATING: 0,
  SUCCESS: 1,
  FAILED: 2,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
    fontWeight: 'bold',
  },
}));

function generateKeyTable(id, field) {
  return `${id}-${field}`;
}

const headCells = [
  {
    id: 'jobId',
    label: 'Job #',
  },
  {
    id: 'filename',
    label: 'File Name',
  },

  {
    id: 'rows',
    label: 'No Of Rows in Csv',
  },
  {
    id: 'insertedDetails',
    label: 'No Of Rows Inserted',
  },
  {
    id: 'dateCreated',
    label: 'Date Created',
  },
  {
    id: 'dateUpdated',
    label: 'Date Updated',
  },
  {
    id: 'message',
    label: 'Logs',
  },
  {
    id: 'Status',
    label: 'Status',
  },
];

export function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {};

const EnhancedTableToolbar = ({ loading }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {loading ? 'Loading' : ' Csv List'}
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function alertMsg(status, statusMsg) {
  if (STATUS_TYPES.GENERATING === status) {
    return (
      <Alert variant="filled" severity="info">
        {statusMsg}
      </Alert>
    );
  }
  if (STATUS_TYPES.SUCCESS === status) {
    return (
      <Alert variant="filled" severity="success">
        {statusMsg}
      </Alert>
    );
  }
  if (STATUS_TYPES.FAILED === status) {
    return (
      <Alert variant="filled" severity="error">
        {statusMsg}
      </Alert>
    );
  }
  return (
    <Alert variant="filled" severity="warning">
      Your status is undefined
    </Alert>
  );
}

const ListTable = ({ list, loading }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar loading={loading} />
        {loading ? (
          <></>
        ) : (
          <>
            <TableContainer>
              <Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
                <EnhancedTableHead classes={classes} rowCount={list.length} />
                <TableBody>
                  {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow key={generateKeyTable(row.id, 'table')}>
                        <TableCell align="right">{row.jobId}</TableCell>
                        <TableCell align="right">{row.filename}</TableCell>
                        <TableCell align="right">{formatNumber(row.rows)}</TableCell>
                        <TableCell align="right">{formatNumber(row.insertedDetails)}</TableCell>
                        <TableCell align="right">{row.dateCreated}</TableCell>
                        <TableCell align="right">{row.dateUpdated}</TableCell>
                        <TableCell align="right">{row.message}</TableCell>
                        <TableCell align="right">{alertMsg(row.statusNumber, row.status)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </div>
  );
};

ListTable.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export const CsvListTableList = memo(ListTable);
