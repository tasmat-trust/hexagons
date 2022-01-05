const globalStyles = (theme) => ({
  body: {
    'overflow-x': 'hidden',
  },
  a: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default globalStyles;
