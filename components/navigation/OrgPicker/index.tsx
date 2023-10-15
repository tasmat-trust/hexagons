import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Image from 'next/image';
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));

function OrgPicker({ user }) {
  const classes = useStyles();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!user) return '';

  let img, alt;
  if (user && user.organization) {
    img = user.organization.logo?.url;
    alt = user.organization.name;
  }
  if (img)
    return (
      <Box className={classes.root}>
        <Box>
          <Image
            width={user.organization.logo?.width}
            height={user.organization.logo?.height}
            src={`${apiUrl}${img}`}
            alt={`${alt}'s Logo`}
          />
        </Box>
      </Box>
    );
  return '';
}

export default OrgPicker;
