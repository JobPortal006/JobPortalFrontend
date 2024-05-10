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
// import Logo from '../Dashboard/Images/download.png';
import Logo from '../Dashboard/Images/Logo.jpg';
import UserProfile from '../UserManagement/UserProfile';
import BASE_URL from '../CommonAPI';
import axios from 'axios';
import UserDashboard from '../HomePage/UserDashboard';
import Companylist from '../HomePage/Companylist';
// import './check.css'
import UserAccount from '../UserManagement/UserAccount';
import { SavedJobs } from '../HomePage/SavedJobs';
const drawerWidth = 205;
const data = 'true';
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 3,
    marginTop: '45px'
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '57px'

  },
  toolbar: theme.mixins.toolbar,
  logo: {
    height: 70,
    width:70,
    margin: '20px auto',
    display: 'block',
    borderRadius:'50%'
    // backgroundColor:'white'
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
    width: '100%',
    
    maxWidth: '100%',
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
const profile = async () => {

  const token = localStorage.getItem('loginToken');

  const requestData = {
    token: token,
  };

 

  try {
    const response = await axios.post(`${BASE_URL}/get_user_details/`, requestData);

    if (response.data.status === true) {
      // navigate('/UserProfile');
    } 
    // else {
    //   alert("User details not found. Please create an account.");
    //   navigate('/CreateAccount');
    // }
  } catch (error) {
    console.error('Error sending token and data:', error);
  }
};
const UserDash = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Applied Jobs');

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
    <div style={{   
      width: '100%', // Set width to 100%
      background: 'linear-gradient(0deg, rgba(197,202,233,1) 0%, rgba(26,35,126,1) 100%)',
      height: '100vh'
    }}>
      <div className={classes.toolbar} />
      <img src={Logo} alt="Logo" className={classes.logo} />
      {/* <Avatar alt="Profile Picture" src="/broken-image.jpg" className={classes.avatar} /> */}
      <List style={{margin:"10px"}} >
      <ListItem 
          button 
          selected={selectedItem === 'Applied Jobs'} 
          onClick={() => handleListItemClick('Applied Jobs')} 
          style={{
            backgroundColor: selectedItem === 'Applied Jobs' ? '#ffffff' : 'inherit',
            borderRadius: '5px', // Add border-radius
            fontWeight: selectedItem === 'Applied Jobs' ? 'bold' : 'normal',
            color: selectedItem === 'Applied Jobs' ? '#1A237E' : 'white' // Add text color
          }}>
          <ListItemIcon style={{ color: selectedItem === 'Applied Jobs' ? '#1A237E' : 'white' }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Applied Jobs" />
        </ListItem>
        <ListItem 
        button 
        selected={selectedItem === 'Saved Jobs'} 
        onClick={() => {
          handleListItemClick('Saved Jobs');
          profile(); // Call the profile function
        }} 
        style={{
          backgroundColor: selectedItem === 'Saved Jobs' ? '#ffffff' : 'inherit',
          fontWeight: selectedItem === 'Saved Jobs' ? 'bold' : 'normal',
          borderRadius: '5px', // Add border-radius
          color: selectedItem === 'Saved Jobs' ? '#1A237E' : 'white' // Add text color
        }}
      >
        <ListItemIcon style={{ color: selectedItem === 'Saved Jobs' ? '#1A237E' : 'white' }}><AccountCircleIcon /></ListItemIcon>
        <ListItemText primary="Saved Jobs" />
      </ListItem>
        
      </List>
    </div>
  );

  return (
    <div className="userDashboard-background">
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
            style={{backgroundColor:"aqua"}}
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
            style={{backgroundColor:"aqua"}}
          >
            {drawer}
          </Drawer> 
        </Hidden>
      </nav>
      <div className={classes.oppositeContainer}>
        {selectedItem === 'Saved Jobs' && (
          <SavedJobs />
        )}
      </div>
      <div className={classes.oppositeContainer}>
        {selectedItem === 'Applied Jobs' && (
          <UserDashboard />
       
          
        )}
      </div>
    </div>
    </div>
  );
};

export default UserDash;