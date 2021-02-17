import React, { memo, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

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
    [theme.breakpoints.up('md')]: {
      width: '100% !important',
    },
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

const MENU = {
  UTILITY: 'utilities',
  TRANS: 'transaction',
};

const utilities = [
  {
    text: 'Home',
    href: '/',
    Icon: StarBorder,
  },
  {
    text: 'About',
    href: '/about',
    Icon: StarBorder,
  },
  {
    text: 'Dashboard',
    href: '/dashboard',
    Icon: StarBorder,
  },
];

const anchor = 'left';

function ListLinks({ router, openArray, desktop = false, toggleDrawer }) {
  const classes = useStyles();
  const [open, setOpen] = openArray;
  const [nested, setNested] = useState({
    [MENU.UTILITY]: false,
    [MENU.TRANS]: false,
  });
  const goToPage = href => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (!desktop) {
      setOpen(open);
    }
    router.push(href);
  };

  const handleNested = type => {
    const bool = !nested[type];
    const newNested = { ...nested, [type]: bool };

    setNested(newNested);
  };

  function ListItemTag(props) {
    const { value = '', Icon = null, href = null } = props;

    return (
      <ListItem button onClick={goToPage(href)} onKeyDown={goToPage(href)}>
        {Icon === null ? (
          <></>
        ) : (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={value} />
      </ListItem>
    );
  }

  function ListMenu() {
    return (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
          className={classes.root}>
          <ListItem
            button
            onClick={desktop ? () => {} : toggleDrawer(false)}
            onKeyDown={desktop ? () => {} : toggleDrawer(false)}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Delivery" />
          </ListItem>
          <ListItem button onClick={() => handleNested(MENU.UTILITY)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Purchase Order" />
            {nested[MENU.UTILITY] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={nested[MENU.UTILITY]}>
            <List component="div" disablePadding className={classes.nested}>
              {utilities.map(({ text, href, Icon = null }) => (
                <ListItemTag
                  key={text}
                  value={text}
                  href={href}
                  Icon={Icon}></ListItemTag>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }

  return <ListMenu />;
}

ListLinks.propTypes = {
  router: PropTypes.object.isRequired,
  openArray: PropTypes.array,
  desktop: PropTypes.bool,
  toggleDrawer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ListLinks);
