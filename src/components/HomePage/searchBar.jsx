// import React, { useState, useEffect } from 'react';
// import { makeStyles, TextField, Button, Chip, Collapse, Popover } from '@material-ui/core';
// import { MdSearch, MdExpandMore } from 'react-icons/md';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { useNavigate } from 'react-router-dom';


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
//     color: theme.palette.secondary.main,
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
//     background: '#ff4d4d',
//     color: '#ffffff',
//     borderRadius: '50px',
//     '&:hover': {
//       background: '#ff3333',
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
//         const response = await fetch(`http://192.168.1.39:8000/location/?q=${input}`);
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
//         const response = await fetch(`http://192.168.1.39:8000/skill_set/?q=${input}`);
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
//         const response = await fetch(`http://192.168.1.39:8000/experience/?q=${input}`);
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

//   const handleSearch = async () => {
//     let isError = false;

//     // Check if the location field is filled
//     if (searchValue.trim() === '') {
//       setLocationError(true);
//       isError = true;
//     } else {
//       setLocationError(false);
//     }

//     // Check if the skills field is filled
//     if (skillValues.length === 0) {
//       setSkillError(true);
//       isError = true;
//     } else {
//       setSkillError(false);
//     }

//     // Check if the experience field is filled
//     if (experienceValue.trim() === '') {
//       setExperienceError(true);
//       isError = true;
//     } else {
//       setExperienceError(false);
//     }

//     if (!isError) {
//       const searchObject = {
//         skill: skillValues,
//         location: searchValue,
//         experience: experienceValue,
//       };

//       try {
//         const response = await fetch('http://192.168.1.39:8000/view_jobs/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(searchObject), 
//         });

//         if (!response.ok) {
//           throw new Error('Failed to send search data to the server');
//         }

//         // Reset all the search values after the search is performed
//         setSearchValue('');
//         setSkillValues([]);
//         setExperienceValue('');

//         // Navigate to the job search page
//         navigate('/JobSearch');
//         window.location.reload();
//       } catch (error) {
//         console.error('Error sending search data to the server:', error);
//         // Handle error gracefully, show error message to the user, etc.
//       }
//     }
//   };

//   const handleExpand = (event) => {
//     setExpandedAnchorEl(event.currentTarget);
//   };

//   return (
//     <>
//     <div className={isJobSearchPage ? classes.jobSearchRoot : classes.root}>
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
//               required
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
//               required
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
//               required
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

//     </div>
//     {/* <Companylist /> */}

//     </>
//   );
// };

// export default SearchBar;







// ==========================================================================>any one value is true it will search result

import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button, Chip, Collapse, Popover } from '@material-ui/core';
import { MdSearch, MdExpandMore } from 'react-icons/md';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    color: theme.palette.secondary.main,
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
    background: '#ff4d4d',
    color: '#ffffff',
    borderRadius: '50px',
    '&:hover': {
      background: '#ff3333',
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


  useEffect(() => {
    async function fetchLocationSuggestions(input) {
      try {
        const response = await fetch(`http://192.168.1.39:8000/location/?q=${input}`);
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
        const response = await fetch(`http://192.168.1.39:8000/skill_set/?q=${input}`);
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
        const response = await fetch(`http://192.168.1.39:8000/experience/?q=${input}`);
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
      };

      try {
        const response = await fetch('http://192.168.1.39:8000/view_jobs/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchObject), 
        });

        if (!response.ok) {
          throw new Error('Failed to send search data to the server');
        }

        // Reset all the search values after the search is performed
        setSearchValue('');
        setSkillValues([]);
        setExperienceValue('');

        // Navigate to the job search page
        navigate('/JobSearch');
        window.location.reload();
      } catch (error) {
        console.error('Error sending search data to the server:', error);
        // Handle error gracefully, show error message to the user, etc.
      }
    }
  };



  const handleExpand = (event) => {
    setExpandedAnchorEl(event.currentTarget);
  };

  return (
    <>
    <div className={isJobSearchPage ? classes.jobSearchRoot : classes.root}>
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
        >
          Search
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
    {/* <Companylist /> */}

    </>
  );
};

export default SearchBar;







