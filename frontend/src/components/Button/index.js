import Btn from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinning from './../Spinning/index';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const styles = makeStyles(theme =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      margin: theme.spacing(1),
    },
  })
);
function Button(props) {
  const {
    label,
    onClick,
    variant = 'contained',
    color = 'default',
    classname = '',
    loading = false,
    ...others
  } = props;
  const useClass = styles();

  return (
    <Btn
      className={classnames(useClass.root, classname)}
      color={!loading ? color : 'disabled'}
      variant={variant}
      onClick={onClick}
      disabled={loading}
      {...others}>
      {!loading ? label : <Spinning />}
    </Btn>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  color: PropTypes.string,
  classname: PropTypes.string,
};

export default Button;
