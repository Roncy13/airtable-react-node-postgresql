import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ListLinks from 'components/ListLinks';

const styles = makeStyles(theme => ({
  root: {
    height: '100% !important',
  },
  menu: {
    borderRight: '1px solid #D8D8D8',
    '& > .height': {
      height: '100%',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  titlePage: {
    fontWeight: 'bold',
  },
}));
function AppContainer(appProps) {
  const classes = styles();
  const { fullWidth = false, router, ...props } = appProps;
  const openArray = [null, null];

  function MainComponent(props) {
    return (
      <>
        <Box pt={2} pl={2}>
          <Typography variant="h5" className={classes.titlePage}>
            {(router.route.split('/')[1] || '').toUpperCase()}
          </Typography>
        </Box>
        <Container className={classes.root}>
          <Box pt={5} display="flex" flexDirection="column" {...props}></Box>
        </Container>
      </>
    );
  }

  function Menus() {
    return <ListLinks router={router} openArray={openArray} desktop={true} />;
  }

  return (
    <>
      {fullWidth ? (
        <MainComponent {...props} />
      ) : (
        <Grid container className={classes.root}>
          <Grid item xs={2} className={classes.menu}>
            <Menus />
          </Grid>
          <Grid item md={10} xs={12}>
            <MainComponent {...props} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

AppContainer.propTypes = {
  router: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
};

export default AppContainer;
