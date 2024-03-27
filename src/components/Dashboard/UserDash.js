import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Logo from '../Dashboard/Images/download.png';
import UserProfile from '../UserManagement/UserProfile';
import BASE_URL from '../CommonAPI';
import UserDashboard from '../HomePage/UserDashboard';
import Companylist from '../HomePage/Companylist';

const drawerWidth = 205;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 3,
    marginTop: '45px'

  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '70px'

  },
  toolbar: theme.mixins.toolbar,
  logo: {
    height: 50,
    margin: '20px auto',
    display: 'block',
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    marginTop:'80px'

  },
  avatar: {
    margin: '0 auto',
    marginTop: theme.spacing(1),
  },
  oppositeContainer: {
    width: '70%',
    maxWidth: '85%',
    margin: 'auto',
    flexGrow: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '100%', 
    },
  },
}));

const UserDash = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (item) => {
    setSelectedItem(item);
    // Only close the drawer on mobile if it was open to begin with
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <img src={Logo} alt="Logo" className={classes.logo} />
      <Avatar alt="Profile Picture" src="/broken-image.jpg" className={classes.avatar} />
      <List>
        <ListItem button selected={selectedItem === 'Dashboard'} onClick={() => handleListItemClick('Dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button selected={selectedItem === 'My Profile'} onClick={() => handleListItemClick('My Profile')}>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <Hidden smUp implementation="css">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.oppositeContainer} style={{marginLeft:'300px'}}>
        {selectedItem === 'My Profile' && (
          <UserProfile />
        )}
      </div>
      <div className={classes.oppositeContainer}>
        {selectedItem === 'Dashboard' && (
          <UserDashboard />
       

        )}
      </div>
    </div>
  );
};

export default UserDash;