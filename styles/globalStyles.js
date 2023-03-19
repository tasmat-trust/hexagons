const globalStyles = (theme) => ({
  body: {
    'overflow-x': 'hidden',
    // 'background-color': '#003339'
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
