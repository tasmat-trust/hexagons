export default function handlePasswordValidation(passwordString) {
  if (!passwordString) {
    return {
      isPasswordValid: false,
      validationErrorMessage: 'Please enter a password.',
    };
  }
  if (passwordString.toLowerCase() !== passwordString) {
    return {
      isPasswordValid: false,
      validationErrorMessage: 'Password must be lowercase',
    };
  }

  if (passwordString.length < 16) {
    return {
      isPasswordValid: false,
      validationErrorMessage: 'Password must be longer than sixteen characters',
    };
  }

  let forbiddenCharacters = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '$',
    '!',
    '%',
    '@',
    '*',
    '^',
    '-',
    '+',
    '-',
    '~',
    ';',
    ':',
    ',',
    '<',
    '>',
    '/',
    '`',
    '£',
    '|',
    '#',
  ];
  const gotForbidden = forbiddenCharacters.map((char) => {
    if (passwordString.includes(char)) {
      return false;
    }
  });
  if (gotForbidden.includes(false)) {
    return {
      isPasswordValid: false,
      validationErrorMessage: 'Password must not contain special characters or numbers',
    };
  }
  return {
    isPasswordValid: true,
  };
}
