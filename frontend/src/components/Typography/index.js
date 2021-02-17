import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Tpography from '@material-ui/core/Typography';
import classnames from 'classnames';

const styles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    bold: {
      fontWeight: 'bold',
    },
  })
);

function Typography(props) {
  const {
    color = 'textPrimary',
    label,
    variant,
    component = '',
    classnames: cls = '',
    bold = false,
  } = props;
  const classname = styles();

  return (
    <Tpography
      variant={variant}
      component={component}
      color={color}
      className={classnames(classname.root, bold ? classname.bold : '', cls)}>
      {label}
    </Tpography>
  );
}

Typography.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string,
  component: PropTypes.string,
  bold: PropTypes.bool,
  classnames: PropTypes.string,
};

export default Typography;
