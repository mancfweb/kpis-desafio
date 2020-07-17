import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {signUpRequest} from '../../store/modules/user/actions';

import Button from '../../components/Button';

import {useStyles} from './styles';

export default function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpRequest({
        name: 'marcus cavalcanti',
        email: 'marcus.cavalcanti20@gmail.com',
        password: 'nautico20',
      }),
    );
    console.log(event);
  };

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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth>
            Cadastrar
          </Button>
          <Grid container>
            <Grid item>Ainda não tem conta? Crie a sua agora</Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <p>todos os direitos reservados</p>
      </Box>
    </Container>
  );
}
