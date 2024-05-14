

// import React, { useState, useEffect, useContext } from 'react';
// import { makeStyles, TextField, Button, Chip, Collapse, Popover } from '@material-ui/core';
// import { MdSearch, MdExpandMore } from 'react-icons/md';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import UserContext from '../Sprint 2/contextFilter';
// import { BeatLoader,PacmanLoader,ScaleLoader } from 'react-spinners';
// import { css } from '@emotion/react';
// import './HomeDesign.css'
// import BASE_URL from '../CommonAPI';

// const override = css`
//   display: block;
//   margin: 0 auto;
// `;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//   },
//   searchContainer: {
//     display: 'flex',
//     flexDirection: 'column', // Change flex direction to column for mobile
//     alignItems: 'center',
//     gap: theme.spacing(0.5),
//     padding: theme.spacing(1), // Reduce padding for mobile
//     background: '#ffffff',
//     borderRadius: 20,
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//     position: 'relative',
//     [theme.breakpoints.up('sm')]: {
//       flexDirection: 'row', // Change flex direction to row for larger screens
//       padding: theme.spacing(2), // Restore padding for larger screens
//     },
//   },
//   searchInput: {
//     flex: 1,
//     minWidth: 200,
//     [theme.breakpoints.up('sm')]: {
//       minWidth: 'unset', // Remove minWidth for larger screens
//     },
//   },
//   formControl: {
//     minWidth: 120,
//     zIndex: 1,
//   },
//   button: {
//     marginLeft: theme.spacing(0), // Adjust margin for mobile
//     marginTop: theme.spacing(2), // Adjust margin for mobile
//     background: '#050505',
//     color: '#ffffff',
//     '&:hover': {
//       background: '#877067',
//     },
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(2), // Restore margin for larger screens
//       marginTop: 0, // Restore margin for larger screens
//     },
//   },
//   icon: {
//     // color: theme.palette.secondary.main,
//     color: '#5C6BC0',
//   },
//   chip: {
//     margin: theme.spacing(0.5),
//   },
//   expandButton: {
//     marginLeft: theme.spacing(1),
//     cursor: 'pointer',
//   },
//   popover: {
//     padding: theme.spacing(2),
//   },

//   jobSearchRoot: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: '20px',
//     marginTop: '10px'
//   },
//   jobSearchContainer: {
//     display: 'flex',
//     flexDirection: 'column', // Change flex direction to column for mobile
//     alignItems: 'center',
//     gap: theme.spacing(1),
//     padding: theme.spacing(2),
//     background: '#ffffff',
//     borderRadius: 24,
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//     position: 'relative',
//     [theme.breakpoints.up('sm')]: {
//       flexDirection: 'row', // Change flex direction to row for larger screens
//     },
//   },
//   jobSearchInput: {
//     flex: 1,
//     minWidth: 200,
//     [theme.breakpoints.up('sm')]: {
//       minWidth: 'unset', // Remove minWidth for larger screens
//     },
//   },
//   jobSearchButton: {
//     marginLeft: theme.spacing(0), // Adjust margin for mobile
//     marginTop: theme.spacing(2), // Adjust margin for mobile
//     background: ' #1A237E',
//     color: '#ffffff',
//     borderRadius: '50px',
//     '&:hover': {
//       background: '#5C6BC0',
//     },
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(2), // Restore margin for larger screens
//       marginTop: 0, // Restore margin for larger screens
//     },
//   },
// }));

// const SearchBar = ({ isJobSearchPage }) => {
//   const classes = useStyles();
//   const [searchValue, setSearchValue] = useState('');
//   const [skillValues, setSkillValues] = useState([]);
//   const [experienceValue, setExperienceValue] = useState('');
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [skillSuggestions, setSkillSuggestions] = useState([]);
//   const [experienceSuggestions, setExperienceSuggestions] = useState([]);
//   const [locationError, setLocationError] = useState(false);
//   const [skillError, setSkillError] = useState(false);
//   const [experienceError, setExperienceError] = useState(false);
//   const [expandedAnchorEl, setExpandedAnchorEl] = useState(null);
//   const navigate = useNavigate();


//   useEffect(() => {
//     async function fetchLocationSuggestions(input) {
//       try {
//         const api = `${BASE_URL}/job_apply_locations/?q=${input}`
//         console.log((api,'api--------'));
//         const response = await fetch(api);
//         const data = await response.json();
//         setLocationSuggestions(data.map((item) => item.location));
//       } catch (error) {
//         console.error('Error fetching location suggestions:', error);
//         setLocationSuggestions([]);
//       }
//     }

//     if (searchValue.trim() !== '') {
//       fetchLocationSuggestions(searchValue);
//     } else {
//       setLocationSuggestions([]);
//     }
//   }, [searchValue]);

//   useEffect(() => {
//     async function fetchSkillSuggestions(input) {
//       try {
//         const response = await fetch(`${BASE_URL}/skill_set/?q=${input}`);
//         const data = await response.json();

//         if (data && Array.isArray(data)) {
//           const skillSuggestions = data
//             .map((item) => item.skill_set)
//             .filter(Boolean);
//           const jobTitleSuggestions = data
//             .map((item) => item.job_title)
//             .filter(Boolean);
//           const combinedSuggestions = [...skillSuggestions, ...jobTitleSuggestions];
//           setSkillSuggestions(combinedSuggestions);
//         } else {
//           setSkillSuggestions([]);
//         }
//       } catch (error) {
//         console.error('Error fetching skill suggestions:', error);
//         setSkillSuggestions([]);
//       }
//     }

//     if (skillValues.length === 0) {
//       if (skillValues.length === 0 && searchValue.trim() === '') {
//         fetchSkillSuggestions('');
//       } else if (searchValue.trim() !== '') {
//         fetchSkillSuggestions(searchValue);
//       }
//     }
//   }, [searchValue, skillValues]);

//   useEffect(() => {
//     async function fetchExperienceSuggestions(input) {
//       try {
//         const response = await fetch(`${BASE_URL}/experience/?q=${input}`);
//         const data = await response.json();
//         setExperienceSuggestions(data.map((item) => item.experience));
//       } catch (error) {
//         console.error('Error fetching experience suggestions:', error);
//         setExperienceSuggestions([]);
//       }
//     }

//     if (experienceValue.trim() !== '') {
//       fetchExperienceSuggestions(experienceValue);
//     } else {
//       setExperienceSuggestions([]);
//     }
//   }, [experienceValue]);

//   // using user context
//   const{oneData,setData} = useContext(UserContext);
//   const{searchJob,setsearchJob}=useContext(UserContext);
//   const [loading, setLoading] = useState(false);
//   console.log(searchJob,'=======>user context true');
//   const handleSearch = async () => {
//     let isError = false;

//     // Check if at least one field is filled
//     if (searchValue.trim() === '' && skillValues.length === 0 && experienceValue.trim() === '') {
//       // If none of the fields are filled, show an alert
//       // alert('Please fill in at least one field');
//       toast.error('Please fill at least one of the field.', { position: toast.POSITION.TOP_CENTER });

//       isError = true;
//     }

//     if (!isError) {
//       const searchObject = {
//         skill: skillValues,
//         location: searchValue,
//         experience: experienceValue,
//       };


//       try {
//         setLoading(true);
//         const response = await fetch(`${BASE_URL}/search_jobs/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(searchObject), 

//         })
//         const data = await response.json();
//         const searchResponse = data.data;
//         console.log(searchResponse,"=========Searchresponse");
//         console.log(data.status,"SearchJob-Status===>");
//         if(data.status !== true){
//           alert("Job not Found")
//           window.location.reload();
//         } else{
//           navigate('/Filter');

//         }

//         console.log(data,'=============prathap');


//       const checking={
//         skillValues,
//         searchValue,
//         experienceValue
//       }
//       console.log(checking,"skill values");

//         if (!response.ok) {
//           throw new Error('Failed to send search data to the server');
//         }

//         setSearchValue('');
//         setSkillValues([]);
//         setExperienceValue('');

//         if(searchJob !== null){
//         setsearchJob(searchResponse)

//       }else{

//         setData(searchResponse)
//       }


//         // Navigate to the job search page
//         // navigate('/Filter');
//         // window.location.reload();

//       } catch (error) {
//         console.error('Error sending search data to the server:', error);
//         // Handle error gracefully, show error message to the user, etc.
//       }
//       finally {
//         setLoading(false); // Set loading state to false after receiving response or error
//       }
//     }

//   };



//   const handleExpand = (event) => {
//     setExpandedAnchorEl(event.currentTarget);
//   };

//   return (
//     <>
//      {loading ? (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                     {/* <BeatLoader color="#36D7B7" css={override} />  */}

//                           <BeatLoader color="black" />
//                     <p style={{color:'#FFFCF4'}}>Loading Search Data...</p> {/* Text indicating that profile information is loading */}
//                 </div>):(
//     <div className={isJobSearchPage ? classes.jobSearchRoot : classes.root}>
//       <p className='lineFour'>Discover 50 lakh+ career opportunities</p>
//       <div className={isJobSearchPage ? classes.jobSearchContainer : classes.searchContainer}>

//         <Autocomplete
//           multiple
//           freeSolo
//           options={skillSuggestions}
//           value={skillValues}
//           onChange={(event, newValues) => {
//             setSkillValues(newValues);
//             setSkillError(false); // Reset skills error state when input changes
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               className={classes.searchInput}
//               variant="standard"
//               label="Search-skills/Title"
//               color="secondary"
//               // required
//               error={skillError && skillValues.length === 0}
//               helperText={skillError && skillValues.length === 0 ? "This field is required" : ""}
//               InputProps={{
//                 ...params.InputProps,
//                 startAdornment: <MdSearch className={classes.icon} />,
//                 endAdornment: (
//                   <React.Fragment>
//                     {skillValues.slice(0, 2).map((skill, index) => (
//                       <Chip
//                         key={index}
//                         label={skill}
//                         onDelete={() => {
//                           setSkillValues((prevValues) => prevValues.filter((value) => value !== skill));
//                         }}
//                         className={classes.chip}
//                       />
//                     ))}
//                     {skillValues.length > 2 && (
//                       <Chip

//                         label={`+${skillValues.length - 2} more`}
//                         onClick={handleExpand}
//                         variant="outlined"
//                         className={classes.expandButton}
//                         deleteIcon={<MdExpandMore />}
//                       />
//                     )}
//                   </React.Fragment>
//                 ),
//               }}
//             />
//           )}
//           style={{ minWidth: 200 }}
//         />
//               <Autocomplete
//           freeSolo
//           options={locationSuggestions}
//           inputValue={searchValue}
//           onInputChange={(event, newInputValue) => {
//             setSearchValue(newInputValue);
//             setLocationError(false); // Reset location error state when input changes
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               className={classes.searchInput}
//               variant="standard"
//               label="Search-location"
//               color="secondary"
//               // required
//               error={locationError && searchValue.trim() === ''}
//               helperText={locationError && searchValue.trim() === '' ? "This field is required" : ""}
//               InputProps={{
//                 ...params.InputProps,
//                 startAdornment: <MdSearch className={classes.icon} />,
//               }}
//             />
//           )}
//           style={{ minWidth: 200 }}
//         />
//         <Autocomplete
//           freeSolo
//           options={experienceSuggestions}
//           inputValue={experienceValue}
//           onInputChange={(event, newInputValue) => {
//             setExperienceValue(newInputValue);
//             setExperienceError(false); // Reset experience error state when input changes
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               className={classes.searchInput}
//               variant="standard"
//               label="Search-experience"
//               color="secondary"
//               // required
//               error={experienceError && experienceValue.trim() === ''}
//               helperText={experienceError && experienceValue.trim() === '' ? "This field is required" : ""}
//               InputProps={{
//                 ...params.InputProps,
//                 startAdornment: <MdSearch className={classes.icon} />,
//               }}
//             />
//           )}
//           style={{ minWidth: 200 }}
//         />

//         <Button
//           variant="contained"
//           className={isJobSearchPage ? classes.jobSearchButton : classes.button}
//           onClick={handleSearch}
//         >
//           Search
//         </Button>

//       </div>
//       <Popover 
//         open={Boolean(expandedAnchorEl)}
//         anchorEl={expandedAnchorEl}
//         onClose={() => setExpandedAnchorEl(null)}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <div className={classes.popover}>
//           {skillValues.slice(2).map((skill, index) => (
//             <Chip
//               key={index}
//               label={skill}
//               onDelete={() => {
//                 setSkillValues((prevValues) =>
//                   prevValues.filter((value) => value !== skill)
//                 );
//               }}
//               className={classes.chip}
//             />
//           ))}
//         </div>
//       </Popover>
//       <ToastContainer />


//     </div>
//                 )}
//     </>
//   );
// };

// export default SearchBar;






// using use context

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, TextField, Button, Chip, Collapse, Popover } from '@material-ui/core';
import { MdSearch, MdExpandMore } from 'react-icons/md';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../Sprint 2/contextFilter';
import { BeatLoader, PacmanLoader, ScaleLoader } from 'react-spinners';
import { css } from '@emotion/react';
import './HomeDesign.css'
import BASE_URL from '../CommonAPI';
import { useDispatch } from 'react-redux';
import { setSearchResponse } from '../actions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column', // Change flex direction to column for mobile
    alignItems: 'center',
    gap: theme.spacing(0.5),
    padding: theme.spacing(1), // Reduce padding for mobile
    background: '#ffffff',
    borderRadius: 20,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row', // Change flex direction to row for larger screens
      padding: theme.spacing(2), // Restore padding for larger screens
    },
  },
  searchInput: {
    flex: 1,
    minWidth: 200,
    [theme.breakpoints.up('sm')]: {
      minWidth: 'unset', // Remove minWidth for larger screens
    },
  },
  formControl: {
    minWidth: 120,
    zIndex: 1,
  },
  button: {
    marginLeft: theme.spacing(0), // Adjust margin for mobile
    marginTop: theme.spacing(2), // Adjust margin for mobile
    background: '#050505',
    color: '#ffffff',
    '&:hover': {
      background: '#877067',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2), // Restore margin for larger screens
      marginTop: 0, // Restore margin for larger screens
    },
  },
  icon: {
    // color: theme.palette.secondary.main,
    color: '#5C6BC0',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  expandButton: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
  },
  popover: {
    padding: theme.spacing(2),
  },

  jobSearchRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    marginTop: '10px'
  },
  jobSearchContainer: {
    display: 'flex',
    flexDirection: 'column', // Change flex direction to column for mobile
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    background: '#ffffff',
    borderRadius: 24,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row', // Change flex direction to row for larger screens
    },
  },
  jobSearchInput: {
    flex: 1,
    minWidth: 200,
    [theme.breakpoints.up('sm')]: {
      minWidth: 'unset', // Remove minWidth for larger screens
    },
  },
  jobSearchButton: {
    marginLeft: theme.spacing(0), // Adjust margin for mobile
    marginTop: theme.spacing(2), // Adjust margin for mobile
    background: ' #1A237E',
    color: '#ffffff',
    borderRadius: '50px',
    '&:hover': {
      background: '#5C6BC0',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2), // Restore margin for larger screens
      marginTop: 0, // Restore margin for larger screens
    },
  },
}));

const SearchBar = ({ isJobSearchPage }) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [skillValues, setSkillValues] = useState([]);
  const [experienceValue, setExperienceValue] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [experienceSuggestions, setExperienceSuggestions] = useState([]);
  const [locationError, setLocationError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [experienceError, setExperienceError] = useState(false);
  const [expandedAnchorEl, setExpandedAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
console.log(isJobSearchPage,'isJobSearchPage-------');
  useEffect(() => {
    async function fetchLocationSuggestions(input) {
      try {
        const api = `${BASE_URL}/job_apply_locations/?q=${input}`
        console.log((api, 'api--------'));
        const response = await fetch(api);
        const data = await response.json();
        setLocationSuggestions(data.map((item) => item.location));
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        setLocationSuggestions([]);
      }
    }

    if (searchValue.trim() !== '') {
      fetchLocationSuggestions(searchValue);
    } else {
      setLocationSuggestions([]);
    }
  }, [searchValue]);

  useEffect(() => {
    async function fetchSkillSuggestions(input) {
      try {
        const response = await fetch(`${BASE_URL}/skill_set/?q=${input}`);
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const skillSuggestions = data
            .map((item) => item.skill_set)
            .filter(Boolean);
          const jobTitleSuggestions = data
            .map((item) => item.job_title)
            .filter(Boolean);
          const combinedSuggestions = [...skillSuggestions, ...jobTitleSuggestions];
          setSkillSuggestions(combinedSuggestions);
        } else {
          setSkillSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching skill suggestions:', error);
        setSkillSuggestions([]);
      }
    }

    if (skillValues.length === 0) {
      if (skillValues.length === 0 && searchValue.trim() === '') {
        fetchSkillSuggestions('');
      } else if (searchValue.trim() !== '') {
        fetchSkillSuggestions(searchValue);
      }
    }
  }, [searchValue, skillValues]);

  useEffect(() => {
    async function fetchExperienceSuggestions(input) {
      try {
        const response = await fetch(`${BASE_URL}/experience/?q=${input}`);
        const data = await response.json();
        setExperienceSuggestions(data.map((item) => item.experience));
      } catch (error) {
        console.error('Error fetching experience suggestions:', error);
        setExperienceSuggestions([]);
      }
    }

    if (experienceValue.trim() !== '') {
      fetchExperienceSuggestions(experienceValue);
    } else {
      setExperienceSuggestions([]);
    }
  }, [experienceValue]);

  // using user context
  const { oneData, setData } = useContext(UserContext);
  const { searchJob, setsearchJob,setcompanyList } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  console.log(searchJob, '=======>user context true');
  const token = localStorage.getItem('loginToken');
  const handleSearch = async () => {
    let isError = false;

    // Check if at least one field is filled
    if (searchValue.trim() === '' && skillValues.length === 0 && experienceValue.trim() === '') {
      // If none of the fields are filled, show an alert
      // alert('Please fill in at least one field');
      toast.error('Please fill at least one of the field.', { position: toast.POSITION.TOP_CENTER });

      isError = true;
    }

    if (!isError) {
      const searchObject = {
        skill: skillValues,
        location: searchValue,
        experience: experienceValue,
        token:token,
      };


      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/search_jobs/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchObject),

        })
        const sarchdata = await response.json();
        const searchResponse = sarchdata.data;

        localStorage.setItem("Search_result", JSON.stringify(searchResponse));
        const storedDataToUse = JSON.parse(localStorage.getItem("Search_result"));
        console.log(storedDataToUse, 'storedDataToUse------->');
        // Check if storedDataToUse is equal to dataToUse
        if (storedDataToUse && JSON.stringify(storedDataToUse) === JSON.stringify(searchResponse)) {
          // If equal, set resultdataToUse to storedDataToUse
          localStorage.setItem("Search_result", JSON.stringify(searchResponse));
          localStorage.removeItem("Company_result");
          localStorage.removeItem("Filter_result");
          localStorage.removeItem("Employee_type_result");
        } else {
          // If not equal, remove the previous dataToUse from localStorage
          localStorage.removeItem("Employee_type_result");
          localStorage.removeItem("Filter_result");
          localStorage.removeItem("Company_result");
          // Update localStorage with the new dataToUse
          localStorage.removeItem("Search_result");
          localStorage.setItem("Search_result", JSON.stringify(searchResponse));
        }

        console.log(searchResponse, "=========Searchresponse");
        console.log(sarchdata.status, "SearchJob-Status===>");
        if (sarchdata.status === true) {
          // alert("Job not Found")
          // window.location.reload();
          navigate('/Filter');
          localStorage.setItem("Filter_response", JSON.stringify(searchResponse));
          const storedResultResponse = JSON.parse(localStorage.getItem("Filter_response"));
          console.log(storedResultResponse,'storedResultResponse--------');
        } else {
          alert("Job not Found")
          // window.location.reload();
          // const storedResultResponse =localStorage.setItem("Filter_response", JSON.stringify(searchResponse));
          // console.log(storedResultResponse,'storedResultResponse--------');
        }

        console.log(sarchdata, '=============da');


        const checking = {
          skillValues,
          searchValue,
          experienceValue
        }
        console.log(checking, "skill values");

        if (!response.ok) {
          throw new Error('Failed to send search data to the server');
        }

        setSearchValue('');
        setSkillValues([]);
        setExperienceValue('');
        dispatch(setSearchResponse(searchResponse));

        if (searchJob !== null) {
          setsearchJob(searchResponse)
          setcompanyList(false)
          // localStorage.setItem("Search_result", JSON.stringify(searchResponse));

        } else {
          setData(searchResponse)
          
        }


        // Navigate to the job search page
        // navigate('/Filter');
        // window.location.reload();

      } catch (error) {
        console.error('Error sending search data to the server:', error);
        // Handle error gracefully, show error message to the user, etc.
      }
      finally {
        setLoading(false); // Set loading state to false after receiving response or error
      }
    }

  };



  const handleExpand = (event) => {
    setExpandedAnchorEl(event.currentTarget);
  };

  return (
    <>

      <div className={isJobSearchPage ? classes.jobSearchRoot : classes.root}>
        <p className='lineFour'>Discover 50 lakh+ career opportunities</p>
        <div className={isJobSearchPage ? classes.jobSearchContainer : classes.searchContainer}>

          <Autocomplete
            multiple
            freeSolo
            options={skillSuggestions}
            value={skillValues}
            onChange={(event, newValues) => {
              setSkillValues(newValues);
              setSkillError(false); // Reset skills error state when input changes
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.searchInput}
                variant="standard"
                label="Search-skills/Title"
                color="secondary"
                // required
                error={skillError && skillValues.length === 0}
                helperText={skillError && skillValues.length === 0 ? "This field is required" : ""}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <MdSearch className={classes.icon} />,
                  endAdornment: (
                    <React.Fragment>
                      {skillValues.slice(0, 2).map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() => {
                            setSkillValues((prevValues) => prevValues.filter((value) => value !== skill));
                          }}
                          className={classes.chip}
                        />
                      ))}
                      {skillValues.length > 2 && (
                        <Chip

                          label={`+${skillValues.length - 2} more`}
                          onClick={handleExpand}
                          variant="outlined"
                          className={classes.expandButton}
                          deleteIcon={<MdExpandMore />}
                        />
                      )}
                    </React.Fragment>
                  ),
                }}
              />
            )}
            style={{ minWidth: 200 }}
          />
          <Autocomplete
            freeSolo
            options={locationSuggestions}
            inputValue={searchValue}
            onInputChange={(event, newInputValue) => {
              setSearchValue(newInputValue);
              setLocationError(false); // Reset location error state when input changes
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.searchInput}
                variant="standard"
                label="Search-location"
                color="secondary"
                // required
                error={locationError && searchValue.trim() === ''}
                helperText={locationError && searchValue.trim() === '' ? "This field is required" : ""}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <MdSearch className={classes.icon} />,
                }}
              />
            )}
            style={{ minWidth: 200 }}
          />
          <Autocomplete
            freeSolo
            options={experienceSuggestions}
            inputValue={experienceValue}
            onInputChange={(event, newInputValue) => {
              setExperienceValue(newInputValue);
              setExperienceError(false); // Reset experience error state when input changes
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.searchInput}
                variant="standard"
                label="Search-experience"
                color="secondary"
                // required
                error={experienceError && experienceValue.trim() === ''}
                helperText={experienceError && experienceValue.trim() === '' ? "This field is required" : ""}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <MdSearch className={classes.icon} />,
                }}
              />
            )}
            style={{ minWidth: 200 }}
          />

          <Button
            variant="contained"
            className={isJobSearchPage ? classes.jobSearchButton : classes.button}
            onClick={handleSearch}
            disabled={loading} // Disable the button while loading
          >
            {loading ? ( // Display loader if loading
              <>
                <BeatLoader color="black" />
                <span style={{ marginLeft: '5px' }}></span>
              </>
            ) : (
              'Search'
            )}
          </Button>


        </div>
        <Popover
          open={Boolean(expandedAnchorEl)}
          anchorEl={expandedAnchorEl}
          onClose={() => setExpandedAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className={classes.popover}>
            {skillValues.slice(2).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => {
                  setSkillValues((prevValues) =>
                    prevValues.filter((value) => value !== skill)
                  );
                }}
                className={classes.chip}
              />
            ))}
          </div>
        </Popover>
        <ToastContainer />


      </div>

    </>
  );
};

export default SearchBar;
