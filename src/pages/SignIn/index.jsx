import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {useStyles} from './styles';

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  return <h1>Login</h1>
}
