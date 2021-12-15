import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Alert from '@mui/material/Alert';

import useLoginLogoutPages from '../../styles/useLoginLogoutPages';
import { InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import Loading from '../ui-globals/Loading';

import handleApiLoginErrors from './handlers/handleApiLoginErrors';
import handleCredentialErrors from './handlers/handleCredentialErrors';

const LoginForm = (props) => {

  const router = useRouter();
  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);
  const [fieldError, setFieldError] = useState(null)
  const [loading, setLoading] = useState(null);

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const clearErrors = () => {
    setError(null)
    setFieldError(null)
  }

  const onSubmit = (event) => {
    event.preventDefault();
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
  return <>
    {error && <Alert data-test-id="error" className={classes.mbelow} severity="error">{error}</Alert>}
    {loading && <Loading message={loading} testId='login-loading' />}
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
          type={showPassword ? 'text' : 'password'}
          className={classes.input}
          value={passwordValue}
          fullWidth
          error={fieldError === 'password'}
          id="password"
          label="Password"
          variant="filled"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                  size="large">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
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
            color="secondary"
          >
            Login
          </Button>
        </FormControl>
      </form>
    )}
  </>;
};

export default LoginForm;
