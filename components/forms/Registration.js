import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Alert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';

import useLoginLogoutPages from '../../styles/useLoginLogoutPages';

import PasswordField from 'material-ui-password-field';
import { Paper, Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import { useState } from 'react';
import Loading from '../ui-globals/Loading';

const RegistrationForm = (props) => {
  const router = useRouter();
  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);

  // Controlled elements (do all):
  const [org, setOrg] = useState(null)

  function handleChange() {
    if (error) {
      setError(null);
    }
  }


  function handleChangeSelect(event) {
    const org = event.target.value
    setOrg(org)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading('Registering your account');
    setError(null);

    const body = {
      username: event.currentTarget.username.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      organization: org,
    };

    axios
      .post('/api/register', body)
      .then((user) => {
        router.push('/');
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.message) {
              if (error.response.data.statusCode === 401) {
                setSuccess('Please check your email');
                setLoading(false);
                setError(null);
                return;
              }

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
      <h1>Create Hexagons Account</h1>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <Loading message={loading} />}
      {success && (
        <>
          Your account has been created and we have emailed you a link. Please click this link to
          activate your account.
        </>
      )}
      {!loading && !success && (
        <form method="post" action="/api/login" onSubmit={onSubmit}>
          <FormControl fullWidth className={classes.input}>
            <InputLabel htmlFor="age-native-simple">School</InputLabel>
            <Select
              native
              value={org}
              onChange={handleChangeSelect}
              name="org"
            >
              <option aria-label="None" value="" />
              {props.orgs.map((org,i) => <option key={`option-${i}`}value={org.id}>{org.name}</option>)}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth className={classes.input}>
            <InputLabel htmlFor="email">Name</InputLabel>
            <Input
              id="username"
              aria-describedby="my-helper-text"
              name="username"
              placeholder="Your name"
              onChange={() => handleChange()}
            />
            <FormHelperText id="my-helper-text">Your first name and last name</FormHelperText>
          </FormControl>
          <FormControl variant="standard" fullWidth className={classes.input}>
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
          <FormControl variant="standard" fullWidth className={classes.input}>
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
              Register
            </Button>
          </FormControl>
        </form>
      )}
    </Paper>
  );
};

export default RegistrationForm;
