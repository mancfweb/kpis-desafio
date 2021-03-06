import React from 'react';
import PropTypes from 'prop-types';

import {Header} from './components';
import {useStyles} from './styles';

const DefaultTheme = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

DefaultTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultTheme;
