import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useLoginLogout } from '../../../middlewares/session'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navBoxes: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100vh'
  },
  topBox: {
    flexGrow: 1
  },
  settingsTitle: {
    padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(2)}px`
  }
}));

function ResponsiveDrawer(props) {
  const { window, children, MainNavItems, SettingNavItems, OrgPicker, user } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { menuOpen, setMenuOpen } = props
  const { login, logout } = useLoginLogout(props)

  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const drawer = (
    <div className={classes.toolbar}>

      <Box className={classes.navBoxes}>
        <OrgPicker user={props.user} />
        <Box className={classes.topBox}>
          <Divider />
          <MainNavItems user={props.user} />
        </Box>
        <SettingNavItems user={props.user} />
      </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          {user && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h3" noWrap className={classes.title}>
            Hexagons
          </Typography>

          {!user && <>
            <Button data-test-id="login-button" color="inherit" onClick={() => login()}>Login</Button>

          </>}
          {user && <>
            <Button data-test-id="logout-button" color="inherit" onClick={() => logout()}>Logout</Button>
          </>}

        </Toolbar>
      </AppBar>
      <nav aria-label="Hexagons navigation">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={menuOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />



        {children}


      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
