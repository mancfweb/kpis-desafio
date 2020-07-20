/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink, useHistory} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Hidden, IconButton} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';

import {signOut} from '../../../../../store/modules/auth/actions';

import {useStyles} from './styles';

const Header = ({className, ...rest}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const signed = useSelector((state) => state.auth.signed);

  const handleSignOut = () => dispatch(signOut());

  useEffect(() => {
    if (!signed) history.push('/');
  }, [signed]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <span className={classes.logo}>
            <img alt="Logo" src="/images/logo.svg" className={classes.logo} />
            <span>Key People Insights</span>
          </span>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden>
          <IconButton
            onClick={() => handleSignOut()}
            className={classes.signOutButton}
            color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
