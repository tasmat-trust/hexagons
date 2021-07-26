import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';

import useLoginLogoutPages from '../../styles/useLoginLogoutPages';

import { Paper, Button, FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';
import { useState } from 'react';
import Loading from '../ui-globals/Loading';
import handleApiLoginErrors from './handlers/handleApiLoginErrors';
import handleCredentialErrors from './handlers/handleCredentialErrors';

const RegistrationForm = (props) => {
  const router = useRouter();
  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);

  const [fieldError, setFieldError] = useState(null)

  // Controlled elements:
  const [orgValue, setOrgValue] = useState(null)
  const [emailValue, setEmailValue] = useState(null)
  const [passwordValue, setPasswordValue] = useState(null)
  const [usernameValue, setUsernameValue] = useState(null)


  function handleChangeSelect(event) {
    const org = event.target.value
    setOrgValue(org)
    setFieldError(null)
  }

  const clearErrors = () => {
    setError(null)
    setFieldError(null)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if (!orgValue) {
      setError('Please choose your school.')
      setFieldError('org')
      return
    }

    if (!username) {
      setError('Please enter your name.')
      setFieldError('username')
      return true
    }
 
    const gotErrs = handleCredentialErrors(emailValue, passwordValue, setError, setFieldError)
    if (gotErrs) {
      return 
    }
    const body = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
      organization: orgValue,
    };

    setLoading('Registering your account');
    setError(null);

    axios
      .post('/api/register', body)
      .then(() => {
        setSuccess(true)
        setLoading(false)
      })
      .catch((error) => {
        handleApiLoginErrors(error, setError, setLoading)
      });
  };
  return (
    <Paper elevation={1} square className={classes.paper}>
      <h1>Create Hexagons Account</h1>
      {error && <Alert className={classes.input} severity="error">{error}</Alert>}
      {loading && <Loading message={loading} />}
      {success && (
        <>
          Your account has been created and we have emailed you an activation link. Please check your email.
        </>
      )}
      {!loading && !success && (
        <form method="post" action="/api/login" onSubmit={onSubmit}>
          <FormControl variant="filled" fullWidth className={classes.input}>
            <InputLabel htmlFor="age-native-simple">School</InputLabel>
            <Select
              native
              error={fieldError === 'org'}
              value={orgValue}
              onBlur={clearErrors}
              onChange={(event) => {
                handleChangeSelect(event)
                setError(null)
              }}
              name="org"
            >
              <option aria-label="None" value="" />
              {props.orgs.map((org, i) => <option key={`option-${i}`} value={org.id}>{org.name}</option>)}
            </Select>
          </FormControl>

          <TextField
            error={fieldError === 'username'}
            className={classes.input}
            value={usernameValue}
            fullWidth
            id="username"
            label="Fullname"
            variant="filled"
            onChange={(ev) => {
              clearErrors()
              setUsernameValue(ev.target.value)
            }} />

          <TextField
            error={fieldError === 'email'}
            className={classes.input}
            value={emailValue}
            fullWidth id="email"
            label="Email"
            variant="filled"
            onChange={(ev) => {
              clearErrors()
              setEmailValue(ev.target.value)
            }} />

          <TextField
            error={fieldError === 'password'}
            className={classes.input}
            value={passwordValue}
            fullWidth id="password"
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
              Register
            </Button>
          </FormControl>
        </form>
      )}
    </Paper>
  );
};

export default RegistrationForm;
