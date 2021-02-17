import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from 'components/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px',
    left: 0,
    right: 0,
    width: '100%',
    maxWidth: '800px',
    maxHeight: '400px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    overflowY: 'scroll',
    [theme.breakpoints.down('md')]: {
      width: '90%',
    },
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function Annoucement() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const Body = (
    <div className={classes.paper}>
      <Box mx={2} my={2}>
        <Grid container spacing="2">
          <Grid item xs={12}>
            <Typography variant="h4">Announcement</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.close}>
            <Button
              label="Close"
              color="primary"
              onClick={() => handleClose()}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      {Body}
    </Modal>
  );
}
