import PropTypes from 'prop-types';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import Link from 'next/link';
import useLoginLogoutPages from '../../styles/useLoginLogoutPages';
import { Button, FormControl, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import Loading from '../ui-globals/Loading';
import handleApiLoginErrors from './handlers/handleApiLoginErrors';
import handlePasswordValidation from './handlers/handlePasswordValidation';

const ResetPasswordForm = ({ isEmail, code }) => {
  const classes = useLoginLogoutPages();
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(null);
  const [fieldError, setFieldError] = useState(null);

  // Controlled elements:
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const clearErrors = () => {
    setError(null);
    setFieldError(null);
  };

  const onSubmitEmail = (event) => {
    event.preventDefault();

    if (!emailValue) {
      setError('Please enter your email.');
      setFieldError('email');
      return true;
    }

    const body = {
      email: emailValue,
    };

    setLoading('Sending you a link to reset your password');
    setError(null);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, body)
      .then(() => {
        setSuccess(true);
        setSuccessMessage(
          'We have sent you a link to reset your password. Please check your email and proceed from there.'
        );
        setLoading(false);
      })
      .catch((error) => {
        handleApiLoginErrors(error, setError, setLoading);
      });
  };

  const onSubmitPassword = (event) => {
    event.preventDefault();

    if (!code) {
      setError('Invalid or missing code. Please go back to your email and try again.');
      return false;
    }

    const { isPasswordValid, validationErrorMessage } = handlePasswordValidation(passwordValue);
    if (!isPasswordValid) {
      setError(validationErrorMessage);
      setFieldError('password');
      return false;
    }

    const body = {
      code: code,
      password: passwordValue,
      passwordConfirmation: passwordValue,
    };

    setLoading('Updating your password');
    setError(null);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, body)
      .then(() => {
        setSuccess(true);
        setSuccessMessage(() => (
          <>
            <Typography>We have successfully reset your password.</Typography>
            <Link href="/login" passHref>
              <Button className={classes.mabove} data-test-id="login-link" variant="contained" color="secondary">
                Go to login
              </Button>
            </Link>
          </>
        ));
        setLoading(false);
      })
      .catch((error) => {
        handleApiLoginErrors(error, setError, setLoading);
      });
  };

  return <>
    {error && (
      <Alert data-test-id="error" className={classes.mbelow} severity="error">
        {error}
      </Alert>
    )}
    {loading && (
      <Loading data-test-id="loading" message={loading} testId="reset-password-loading" />
    )}
    {success && (
      <Alert data-test-id={`${isEmail ? 'email' : 'password'}-success`}>{successMessage}</Alert>
    )}
    {!loading && !success && (
      <form method="post" onSubmit={(e) => (isEmail ? onSubmitEmail(e) : onSubmitPassword(e))}>
        {isEmail && (
          <TextField
            error={fieldError === 'email'}
            className={classes.input}
            value={emailValue}
            fullWidth
            id="email"
            label="Enter your email"
            variant="filled"
            helperText={`We will email you a link to reset your password.`}
            onChange={(ev) => {
              clearErrors();
              setEmailValue(ev.target.value);
            }}
          />
        )}

        {!isEmail && (
          <TextField
            type={showPassword ? 'text' : 'password'}
            error={fieldError === 'password'}
            className={classes.input}
            value={passwordValue}
            fullWidth
            id="password"
            label="Password"
            helperText="Please choose four random words as your password and ensure it is lowercase and doesn't include any special characters or numbers"
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
              ),
            }}
            onChange={(ev) => {
              clearErrors();
              setPasswordValue(ev.target.value);
            }}
          />
        )}
        <FormControl margin="normal">
          <Button
            data-test-id={`reset-password`}
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
          >
            {isEmail ? 'Submit your email' : 'Submit new password'}
          </Button>
        </FormControl>
      </form>
    )}
  </>;
};

ResetPasswordForm.propTypes = {
  orgs: PropTypes.array,
};

export default ResetPasswordForm;
