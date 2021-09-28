import PropTypes from 'prop-types'
import React from 'react';
import axios from 'axios';

import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';

import useLoginLogoutPages from '../../styles/useLoginLogoutPages';

import { Button, FormControl, InputLabel, TextField } from '@material-ui/core';
import { useState } from 'react';
import Loading from '../ui-globals/Loading';
import handleApiLoginErrors from './handlers/handleApiLoginErrors';
import handleCredentialErrors from './handlers/handleCredentialErrors';

import getPermittedDomains from '../../utils/getPermittedDomains';

const RegistrationForm = ({ orgs }) => {


  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);

  const [fieldError, setFieldError] = useState(null)

  // Controlled elements:
  const [orgValue, setOrgValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [usernameValue, setUsernameValue] = useState('')


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

    if (!usernameValue) {
      setError('Please enter your name.')
      setFieldError('username')
      return
    }

    const { humanOrgsArray, computerOrgsArray, error } = getPermittedDomains(orgValue, orgs)

    if (error) {
      setError(error.message)
      return
    } else {
      const gotErrs = handleCredentialErrors(emailValue, passwordValue, setError, setFieldError, humanOrgsArray, computerOrgsArray)

      if (gotErrs) {
        return
      }
    }

    if (passwordValue.toLowerCase() !== passwordValue) {
      setError('Password must be lowercase')
      setFieldError('password')
      return
    }

    if (passwordValue.length < 16) {
      setError('Password must be longer than sixteen characters')
      setFieldError('password')
      return
    }

    let forbiddenCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "$", "!", "%", "@", "*", "^", "-", "+", "-", "~", ";", ":", ",", "<", ">", "/", "`", "£", "|", "#"]
    const gotForbidden = forbiddenCharacters.map((char) => {
      if (passwordValue.includes(char)) {
        setError('Password must not contain special characters or numbers')
        setFieldError('password')
        return false
      }
    })
    if (gotForbidden.includes(false)) return false


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
    <>
      {error && <Alert data-test-id="error" className={classes.mbelow} severity="error">{error}</Alert>}
      {loading && <Loading data-test-id="loading" message={loading} testId='registration-loading' />}
      {success && (
        <>
          Your account has been created and we have emailed you an activation link. Please check your email.
        </>
      )}
      {!loading && !success && (
        <form method="post" action="/api/login" onSubmit={onSubmit}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="age-native-simple">School</InputLabel>
            <Select
              data-test-id='select-school'
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
              <option aria-label="None" value="" data-test-id="blank" />
              {orgs.map((org, i) => <option data-test-id={`option-${i}`} key={`option-${i}`} value={org.id}>{org.name}</option>)}
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
            helperText={`Must be an email address from your organisation.`}
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
            helperText="Please choose four random words as your password and ensure it is lowercase and doesn't include any special characters or numbers"
            variant="filled"
            onChange={(ev) => {
              clearErrors()
              setPasswordValue(ev.target.value)
            }} />

          <FormControl margin="normal">
            <Button
              data-test-id={`register`}
              fullWidth
              type="submit"
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          </FormControl>
        </form>
      )}
    </>
  );
};

RegistrationForm.propTypes = {
  orgs: PropTypes.array
}

export default RegistrationForm;
