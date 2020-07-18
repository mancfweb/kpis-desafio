/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, TextField, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useSnackbar} from 'notistack';

import {createUserRequest} from '../../store/modules/user/actions';

import Button from '../../components/Button';

import {useStyles} from './styles';

export default function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();

  const user = useSelector((state) => state.user);

  const [formFields, setFormFields] = useState({
    name: {
      value: '',
      required: true,
      error: false,
      validationMsg: 'Informe seu nome',
    },
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
    dispatch(createUserRequest(payload));
  };

  useEffect(() => {
    if (user.create.error) {
      enqueueSnackbar(user.create.message, {variant: 'error'});
    }
    if (user.create.success) {
      enqueueSnackbar(user.create.message, {variant: 'success'});
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Crie sua conta</h1>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoFocus
            onChange={(el) => inputChange('name', el.target.value)}
            error={formFields.name.error}
            helperText={
              formFields.name.error ? formFields.name.validationMsg : ''
            }
            disabled={user.create.loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            onChange={(el) => inputChange('email', el.target.value)}
            error={formFields.email.error}
            helperText={
              formFields.email.error ? formFields.email.validationMsg : ''
            }
            disabled={user.create.loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(el) => inputChange('password', el.target.value)}
            error={formFields.password.error}
            helperText={
              formFields.password.error ? formFields.password.validationMsg : ''
            }
            disabled={user.create.loading}
          />
          <div className={classes.submit}>
            <Button type="submit" loading={user.create.loading} fullWidth>
              Cadastrar
            </Button>
            <div className={classes.actions}>
              <Link to="/">Já possui conta? Acesse aqui</Link>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
