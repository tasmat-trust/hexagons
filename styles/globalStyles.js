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
  '.sr-only': {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
});

export default globalStyles;
