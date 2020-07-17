import React from 'react';
import PropTypes from 'prop-types';
import {useStyles} from './styles';

const AuthLayout = ({children}) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
