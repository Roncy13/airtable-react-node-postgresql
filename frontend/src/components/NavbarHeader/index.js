import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  nested: {
    paddingLeft: theme.spacing(4),
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
  },
  menus: {
    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
  },
}));

function NavbarHeader() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          CSV TEST EXAM
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

NavbarHeader.propTypes = {
  router: PropTypes.object.isRequired,
};

export default NavbarHeader;
