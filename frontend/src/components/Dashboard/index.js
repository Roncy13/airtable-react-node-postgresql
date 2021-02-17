import React, { useState, useEffect, memo } from 'react';
import Annoucement from 'components/Announcement';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
  imgs: {
    width: '100%',
  },
}));

function BoxImg({ classes }) {
  return (
    <Box>
      <img
        className={classes.imgs}
        src="https://i.pinimg.com/736x/47/35/7f/47357fc1261d470116a98b49efa4e232.jpg"></img>
    </Box>
  );
}

function Dashboard() {
  const classes = styles();
  const [annoucement, setAnnouncement] = useState(false);

  useEffect(() => {
    setAnnouncement(true);
  }, []);

  return (
    <>
      {annoucement ? <Annoucement /> : <></>}
      <Grid container spacing="2">
        <Grid item md={4} xs={12}>
          <BoxImg classes={classes} />
        </Grid>
        <Grid item md={4} xs={12}>
          <BoxImg classes={classes} />
        </Grid>
        <Grid item md={4} xs={12}>
          <BoxImg classes={classes} />
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Dashboard);
