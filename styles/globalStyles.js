const globalStyles = (theme) => ({
  body: {
    'overflow-x': 'hidden',
  },
  a: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.text.primary,
      textDecoration: 'underline',
    },
  },
});

export default globalStyles;
