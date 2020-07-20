/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, TextField, Container} from '@material-ui/core';
import {useSnackbar} from 'notistack';

import {signInRequest} from '../../store/modules/auth/actions';

import Button from '../../components/Button';

import {useStyles} from './styles';

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();

  const auth = useSelector((state) => state.auth);

  const [formFields, setFormFields] = useState({
    email: {
      value: '',
      required: true,
      error: false,
      validationMsg: 'Informe um e-mail válido',
    },
    password: {
      value: '',
      required: true,
      error: false,
      validationMsg: 'Informe sua senha de acesso',
    },
  });

  const inputChange = (field, value) => {
    setFormFields({
      ...formFields,
      [field]: {
        ...formFields[field],
        error: false,
        value,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = formFields;
    let validationError = false;
    const payload = {};

    // validation all fields and create the payload data
    Object.keys(formFields).map((item) => {
      const field = formFields[item];
      payload[item] = field.value;

      if (field.required && !field.value) {
        validationError = true;
        field.error = true;
      }

      formData[item] = field;
    });
    setFormFields({...formData});

    // if has validation error
    if (validationError) return;
    // do create user
    dispatch(signInRequest(payload.email, payload.password));
  };

  useEffect(() => {
    if (auth.sign.error) {
      enqueueSnackbar(auth.sign.message, {variant: 'error'});
    }
    if (auth.sign.success) {
      enqueueSnackbar(auth.sign.message, {variant: 'success'});
      history.push('/dashboard');
    }
  }, [auth]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar src="/images/logo.svg" style={{width: 70, height: 70}} />
        <h1>Login</h1>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(el) => inputChange('email', el.target.value)}
            error={formFields.email.error}
            helperText={
              formFields.email.error ? formFields.email.validationMsg : ''
            }
            disabled={auth.sign.loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(el) => inputChange('password', el.target.value)}
            error={formFields.password.error}
            helperText={
              formFields.password.error ? formFields.password.validationMsg : ''
            }
            disabled={auth.sign.loading}
          />

          <div className={classes.submit}>
            <Button type="submit" loading={auth.sign.loading} fullWidth>
              Acessar
            </Button>
            <div className={classes.actions}>
              <Link to="/signup">Ainda não tem conta? Crie a sua agora</Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
