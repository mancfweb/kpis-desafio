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

import Button from '../../components/Button';

import {useStyles} from './styles';

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Login</h1>
        <form className={classes.form} noValidate>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" fullWidth>
            Acessar
          </Button>
          <Grid container>
            <Grid item xs>
              Esqueceu a senha?
            </Grid>
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
