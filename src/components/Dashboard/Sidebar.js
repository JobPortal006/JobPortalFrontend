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
import DashboardPostJob from '../Sprint 2/DashboardPostJob';
import DashboardMyJob from '../Sprint 2/DashboardMyjobs';
import NotRegister from "../HomePage/homeimages/Not Register.jpg"
import '../Dashboard/Sidebar.css'

const drawerWidth = 210;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop:'95px'
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop:'57px'
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    height: 50,
    margin: '30px auto',
    display: 'block',
    borderRadius:'50%'
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
    marginTop:'200px',
  }
}));

const SideNavbar = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('My Profile');
  const [loading, setLoading] = useState(false);
  const { employerDetails, setEmployerDetails } = useContext(UserContext);
  console.log(employerDetails,"sidbar--employerDetails---------->");
  const [employerDetailsData, setemployerDetails] = useState(false);
    const [notemployerDetails, setnotemployerDetails] = useState(false);
    // if (employerDetails.status)
    // {
    //     setemployerDetails(true)
    //     setnotemployerDetails(false)
    // }  else{
    //     setnotemployerDetails(true)
    //     setemployerDetails(false)
    // }
    
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
          console.log(response.data,'response.data------->');
          setLoading(false);
          if(response.data.status === true){
            console.log("if--------")
            setemployerDetails(true)
            setnotemployerDetails(false)
          } else if (response.data.status === false){
            console.log("else-if--------")
            setemployerDetails(false)
            setnotemployerDetails(true)
          }
          else{
            console.log("else------------")
            
            setemployerDetails(true)
            setnotemployerDetails(false)
          }
        })
        .catch(error => {
          console.error('Error fetching employer details:', error);
          setLoading(false);
        });
    }
  }, [selectedItem, setEmployerDetails]);
  console.log(employerDetailsData,'employerDetailsData')
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
          selected={selectedItem === 'My Profile'} 
          onClick={() => handleListItemClick('My Profile')}
          style={{
            backgroundColor: selectedItem === 'My Profile' ? '#ffffff' : 'inherit',
            borderRadius: '5px', // Add border-radius
            fontWeight: selectedItem === 'My Profile' ? 'bold' : 'normal',
            color: selectedItem === 'My Profile' ? '#1A237E' : 'white' // Add text color
          }}>
          <ListItemIcon style={{ color: selectedItem === 'My Profile' ? '#1A237E' : 'white' }}><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem 
        button 
        selected={selectedItem === 'My Jobs'} 
        onClick={() => handleListItemClick('My Jobs')}
        style={{
          backgroundColor: selectedItem === 'My Jobs' ? '#ffffff' : 'inherit',
          fontWeight: selectedItem === 'My Jobs' ? 'bold' : 'normal',
          borderRadius: '5px', // Add border-radius
          color: selectedItem === 'My Jobs' ? '#1A237E' : 'white' // Add text color
        }}
      >
        <ListItemIcon style={{ color: selectedItem === 'My Jobs' ? '#1A237E' : 'white' }}><WorkIcon /></ListItemIcon>
        <ListItemText primary="My Jobs" />
      </ListItem>
  <ListItem 
        button 
        selected={selectedItem === 'Post Jobs'} 
        onClick={() => handleListItemClick('Post Jobs')}
        style={{
          backgroundColor: selectedItem === 'Post Jobs' ? '#ffffff' : 'inherit',
          fontWeight: selectedItem === 'Post Jobs' ? 'bold' : 'normal',
          borderRadius: '5px', // Add border-radius
          color: selectedItem === 'Post Jobs' ? '#1A237E' : 'white' // Add text color
        }}
      >
        <ListItemIcon style={{ color: selectedItem === 'Post Jobs' ? '#1A237E' : 'white' }}><PostAddIcon /></ListItemIcon>
        <ListItemText primary="Post Jobs" />
      </ListItem>
        
      </List>
    </div>
  );
  // const drawer = (
  //   <div style={{
  //     height: '600px',
  //     // background: 'rgb(197,202,233)',
  //     // background: 'linear-gradient(to top, #0c3483 0%, #a2b6df 100%, #6b8cce 100%, #a2b6df 100%)'


  // }}>
  //     <div className={classes.toolbar} />
  //     <img src={Logo} alt="Logo" className={classes.logo} />
  //     <Avatar alt="Profile Picture" src="/broken-image.jpg" className={classes.avatar} />
  //     <List>
  //       {/* <ListItem button selected={selectedItem === 'Dashboard'} onClick={() => handleListItemClick('Dashboard')}>
  //         <ListItemIcon><DashboardIcon /></ListItemIcon>
  //         <ListItemText primary="Dashboard" />
  //       </ListItem> */}
  //       <ListItem button selected={selectedItem === 'My Profile'} onClick={() => handleListItemClick('My Profile')}>
  //         <ListItemIcon><AccountCircleIcon /></ListItemIcon>
  //         <ListItemText primary="My Profile" />
  //       </ListItem>
  //       <ListItem button selected={selectedItem === 'My Jobs'} onClick={() => handleListItemClick('My Jobs')}>
  //         <ListItemIcon><WorkIcon /></ListItemIcon>
  //         <ListItemText primary="My Jobs" />
  //       </ListItem>
  //       <ListItem button selected={selectedItem === 'Post Jobs'} onClick={() => handleListItemClick('Post Jobs')}>
  //         <ListItemIcon><PostAddIcon /></ListItemIcon>
  //         <ListItemText primary="Post Jobs" />
  //       </ListItem>
  //     </List>
  //     <Divider />
  //   </div>
  // );

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
        // Display loading indicator while data is being fetched
        <div className="loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height: '100vh',marginTop:'-50px' ,marginLeft:'-50px'}}>
        <ul>         
         <li style={{color:"red"}}>

          <HashLoader  height={100}
              width={100}
              color="#1A237E"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass="grid-wrapper" />
          </li>
          {/* <li>Loading...!</li> */}
         
          </ul>

        </div>
       ) : (
          <>
            {selectedItem === 'My Profile' && employerDetailsData && (
              <div>
              <h1>Hello</h1>
              <UpdateEmployerregister style={{ width: '100%' }} />
              </div>
            )}
             {selectedItem === 'My Profile' && notemployerDetails && (
              // <h1>Not Data</h1>
              <div className='employeerAccount-background'>
              <img src={NotRegister} alt='404' className='EmployeerNotRegister' /><br></br>
              <h5 className='employeererrorText'>You haven't registered an account with us yet..!</h5>
            </div>
            )}
            {selectedItem === 'My Jobs' && (  
              <div className={classes.postJobContainer}>
                {/* <MyJob /> */}
                <DashboardMyJob />
              </div>
            )}
            {selectedItem === 'Post Jobs' && (
              <div className={classes.postJobContainer}>
                {/* <PostJob /> */}
                <DashboardPostJob />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;