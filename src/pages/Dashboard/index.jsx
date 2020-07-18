import React from 'react';
import {Container} from '@material-ui/core';

import Research from './Research';

import {useStyles} from './styles';

function Dashboard() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Research />
    </Container>
  );
}

export default Dashboard;
