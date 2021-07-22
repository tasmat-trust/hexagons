import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Alert from '@material-ui/lab/Alert';

import useLoginLogoutPages from '../styles/useLoginLogoutPages';

import PasswordField from 'material-ui-password-field';
import { Paper, Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { useState } from 'react';
import Loading from '../components/ui-globals/Loading';

const LoginPage = () => {
  const router = useRouter();
  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  function handleChange() {
    if (error) {
      setError(null);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
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
        console.log(error);
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.message) {
              const errorMessage = error.response.data.message
                ? error.response.data.message[0].messages
                  ? error.response.data.message[0].messages[0].id
                  : null
                : null;
              if (!errorMessage) {
                setError('An unknown error occurred, please check and try again.');
              }
              setError(error.response.data.message[0].messages[0].message);
            } else {
              console.log(error.response.data);
              console.log('No error.response.data.message');
              setError('No error.response.data.message');
            }
          } else {
            console.log(error.response);
            console.log('No error.response.data');
            setError('No error.response.data');
          }
        } else {
          console.log(error);
          console.log('No error.response');
          setError('No error.response');
        }
        setLoading(false);
      });
  };
  return (
    <Paper elevation={1} square className={classes.paper}>
      <h1>Login to Hexagons</h1>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <Loading message={loading} />}
      {!loading && (
        <form method="post" action="/api/login" onSubmit={onSubmit}>
          <FormControl variant="contained" fullWidth className={classes.input}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input
              id="email"
              aria-describedby="my-helper-text"
              name="email"
              placeholder="name@tasmat.org.uk"
              onChange={() => handleChange()}
            />
            <FormHelperText id="my-helper-text">Your tasmat email address</FormHelperText>
          </FormControl>
          <FormControl variant="contained" fullWidth className={classes.input}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <PasswordField
              name="password"
              aria-describedby="my-password-text"
              hintText="At least 8 characters"
              floatingLabelText="Enter your password"
              errorText="Your password is too short"
              onChange={() => handleChange()}
            />
            <FormHelperText id="my-password-text">Your unique Hexagons password</FormHelperText>
          </FormControl>

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

export default LoginPage;
