import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Alert from '@material-ui/lab/Alert';

import useLoginLogoutPages from '../../styles/useLoginLogoutPages';

import { Paper, Button, FormControl, TextField } from '@material-ui/core';
import { useState } from 'react';
import Loading from '../ui-globals/Loading';

import handleApiLoginErrors from './handlers/handleApiLoginErrors';
import handleCredentialErrors from './handlers/handleCredentialErrors';

const LoginForm = (props) => {
  const { title, subtitle } = props
  const router = useRouter();
  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState(null)
  const [loading, setLoading] = useState(null);

  const [emailValue, setEmailValue] = useState(null)
  const [passwordValue, setPasswordValue] = useState(null)

  const clearErrors = () => {
    setError(null)
    setFieldError(null)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(emailValue)

    const gotErrs = handleCredentialErrors(emailValue, passwordValue, setError, setFieldError)
    if (gotErrs) {
      return
    }
    setLoading('Logging you in');
    setError(null);

    const body = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    axios
      .post('/api/login', body)
      .then((user) => {
        router.push('/');
      })
      .catch((error) => {
        handleApiLoginErrors(error, setError, setLoading)
      });
  };
  return (
    <Paper elevation={1} square className={classes.paper}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {error && <Alert className={classes.input} severity="error">{error}</Alert>}
      {loading && <Loading message={loading} />}
      {!loading && (
        <form method="post" action="/api/login" onSubmit={onSubmit}>


          <TextField
            className={classes.input}
            value={emailValue}
            fullWidth
            error={fieldError === 'email'}
            id="email"
            label="Email"
            variant="filled"
            onChange={(ev) => {
              clearErrors()
              setEmailValue(ev.target.value)
            }} />

          <TextField
            className={classes.input}
            value={passwordValue}
            fullWidth
            error={fieldError === 'password'}
            id="password"
            label="Password"
            variant="filled"
            onChange={(ev) => {
              clearErrors()
              setPasswordValue(ev.target.value)
            }} />

          <FormControl margin="normal">
            <Button
              data-test-id={`login`}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </FormControl>
        </form>
      )}
    </Paper>
  );
};

export default LoginForm;
