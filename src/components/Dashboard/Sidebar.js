import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List' ;
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { HashLoader } from 'react-spinners';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Logo from '../Dashboard/Images/download.png';
import { Employerregister } from '../EmployeerManagement/Employerregister';
import PostJob from '../Sprint 2/PostJob';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../Sprint 2/contextFilter';
import { UpdateEmployerregister } from '../EmployeerManagement/UpdateEmployeer';
import { css } from '@emotion/react';
import MyJob from '../Sprint 2/MyJob';
import BASE_URL from '../CommonAPI';


const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop:'100px'
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop:'70px'

    
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    height: 50,
    margin: '30px auto',
    display: 'block',
  },
  menuButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    margin: '0 auto',
    marginTop: theme.spacing(1),
  },
  oppositeContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'40px'
    // padding: theme.spacing(2),
  },
  postJobContainer: {
    width: '100%',
    maxWidth: '1100px',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop:'200px'
  },
}));

const SideNavbar = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const { employerDetails, setEmployerDetails } = useContext(UserContext);

  useEffect(() => {
    if (selectedItem === 'My Profile') {
      const token = localStorage.getItem('loginToken');
        console.log(token,"=========token");
      setLoading(true);
      // axios.post('http://192.168.1.44:8000/get_employeer_details/', {
      //   employee_id: 2
      axios.post(`${BASE_URL}/get_employeer_details/`, {
        token
      })
        .then(response => {
          setEmployerDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching employer details:', error);
          setLoading(false);
        });
    }
  }, [selectedItem, setEmployerDetails]);
  useEffect(() => {
    const storedItem = localStorage.getItem('selectedItem');
    if (storedItem) {
      setSelectedItem(storedItem);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedItem', selectedItem);
  }, [selectedItem]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (item) => {
    setSelectedItem(item);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <div  >
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
        <ListItem button selected={selectedItem === 'My Jobs'} onClick={() => handleListItemClick('My Jobs')}>
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="My Jobs" />
        </ListItem>
        <ListItem button selected={selectedItem === 'Post Jobs'} onClick={() => handleListItemClick('Post Jobs')}>
          <ListItemIcon><PostAddIcon /></ListItemIcon>
          <ListItemText primary="Post Jobs" />
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
      <div className={classes.oppositeContainer}>
        {loading ? (
          <div className={classes.loadingContainer}>
            <HashLoader
              height={100}
              width={100}
              color="#1A237E"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper"
            />
            <li>Loading...!</li>
          </div>
        ) : (
          <>
            {selectedItem === 'My Profile' && employerDetails && (
              <UpdateEmployerregister style={{ width: '100%' }} />
            )}
            {selectedItem === 'My Jobs' && (
              <div className={classes.postJobContainer}>
                <MyJob />
              </div>
            )}
            {selectedItem === 'Post Jobs' && (
              <div className={classes.postJobContainer}>
                <PostJob />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;