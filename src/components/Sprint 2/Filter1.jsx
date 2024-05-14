import React, { useState, useEffect, useContext } from "react";
import {Checkbox, FormControlLabel, FormGroup, IconButton, Grid, Radio, RadioGroup} from "@mui/material";
import { Box, List, ListItemButton, ListItemText, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilteredResults from "./FilteredResults";
// import { useNavigate } from "react-router-dom";
import "../Sprint 2/FilterPage.css";
import UserContext from "./contextFilter";
import SearchBar from "../HomePage/searchBar";
import BASE_URL from '../CommonAPI';
import { FaIndianRupeeSign,FaLocationDot,FaClockRotateLeft   } from "react-icons/fa6";
import { faMapMarkerAlt, faMoneyBillAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { BsPersonSquare ,BsFileEarmarkTextFill,BsFillBagCheckFill,BsFillFileCheckFill,BsPersonFillCheck } from "react-icons/bs";
import { BsFillBookmarksFill, BsFillBookmarkCheckFill  } from "react-icons/bs";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from 'react-router-dom';
import Error from "../HomePage/homeimages/No_Result.png"

import { makeStyles, TextField, Chip, Collapse, Popover } from '@material-ui/core';
import { MdSearch, MdExpandMore } from 'react-icons/md';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import { BeatLoader, PacmanLoader, ScaleLoader } from 'react-spinners';

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

const Filter1 = ({ isJobSearchPage }) => {
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
  const [noDataFound, setNoDataFound] = useState(false);
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





  const [showAll, setShowAll] = useState(false);
  const [Show, setShow] = useState(false);
  const [errorOne, setErrorOne ] = useState(false)

  const {oneData,setData,searchJob,setsearchJob,companyList,setcompanyList,jobData,setJobData} = useContext(UserContext);
  console.log(searchJob,'=====search job data')
console.log(oneData, "=====Jeeva data");

useEffect(()=>{},[companyList]);
console.log(companyList, "=====raghul data company list");


  const experienceOptions = [
    "0-1 year",
    "1-2 years",
    "2-3 years",
    "3-4 years",
    "4-5 years",
    "5-6 years",
    "6-7 years",
    "7-8 years",
    "8-9 years",
    "9-10 years",
    "11-13 years",
    "14-16 years",
    "17-19 years",
    "20-22 years",
    "23-25 years",
    "26-28 years",
    "29-30 years",
    "30+ years",
  ];

  const employmentType = [
    "Full Time",
    "Part Time",
    "Hybrid",
    "Temporary",
    "InternShip",
  ];

  const salaryType = [
    "Less than 2 LPA",
    "2 - 4 LPA",
    "4 - 6 LPA",
    "6 - 8 LPA",
    "8 - 10 LPA",
    "11 - 14 LPA",
    "15 - 18 LPA",
    "19 - 22 LPA",
    "23 - 26 LPA",
    "27 - 30 LPA",
    "More than  30 LPA",
  ];
 


  /// Filter Result

  const navigate = useNavigate();
  const [errorTwo, setErrorTwo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollbar, setScrollbar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  // const [PageButton, setPageButton] = useState(false);

  const [FilteResultData, setFilterDataUse] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [PageButton, setPageButton] = useState(false);

  // useEffect to set FilteResultData when dependencies change
  useEffect(() => {
    const Search_result = JSON.parse(localStorage.getItem("Search_result"));
    const Filter_result = JSON.parse(localStorage.getItem("Filter_result"));
    const Company_result = JSON.parse(localStorage.getItem("Company_result"));
    const Employee_type_result = JSON.parse(localStorage.getItem("Employee_type_result"));
    
    const dataToUse = Search_result || Filter_result || Company_result || Employee_type_result || [];
    console.log(dataToUse,'dataToUse-----Filter-head');
    setFilterDataUse(dataToUse);
  }, []);


  // Slice current jobs based on pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = FilteResultData.slice(indexOfFirstJob, indexOfLastJob);

  // Log data for debugging
  console.log(FilteResultData, 'FilteResultData');
  console.log(currentJobs, 'currentJobs');
  console.log(bookmarkedJobs, 'bookmarkedJobs');
  console.log(PageButton, 'PageButton');



  

  const renderOptions = showAll
    ? experienceOptions
    : experienceOptions.slice(0, 5);

  const render = Show ? salaryType : salaryType.slice(0, 5);

  const [selectedExperience, setSelectedExperience] = useState([]);
  const [noResult, setNoResult] = useState(false)

  const handleExperienceClick = (option) => {
    const newSelectedExperience = selectedExperience.includes(option)
      ? selectedExperience.filter((exp) => exp !== option)
      : [...selectedExperience, option];

    setSelectedExperience(newSelectedExperience);
  };

  // Location Fetch
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/job_apply_locations/`);
        if (!response) {
          console.error("Failed to fetch locations");
        }
        const data = await response.json();
        console.log(data, "<====Location====>");
        setLocations(
          data.map((location) => ({ ...location, selected: false }))
        );
      } catch (error) {
        console.error("Error fetching locations:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(
      "Selected locations:",
      locations.filter((location) => location.selected)
    );
  }, [locations]);

  const handleLocationClick = (index) => {
    const newLocations = [...locations];
    newLocations[index].selected = !newLocations[index].selected;
    setLocations(newLocations);
  };

  // Employment Fetch

  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");

  const handleEmploymentTypeChange = (event) => {
    setSelectedEmploymentType(event.target.value);
    console.log("Selected employment type:", event.target.value);
  };

  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    const fetchJobRoles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/job_role/`);
        if (!response.ok) {
          console.error("Failed to fetch job roles");
          return;
        }
        const data = await response.json();
        console.log(data, "<====Roles====>");
        setJobRoles(data.map((role) => ({ ...role, selected: false })));
      } catch (error) {
        console.error("Error fetching job roles:", error.message);
      }
    };

    fetchJobRoles();

  }, []);

  useEffect(() => {
    console.log(
      "Selected job roles:",
      jobRoles.filter((role) => role.selected)
    );
  }, [jobRoles]);

  const handleRoleClick = (index) => {
    const updatedRoles = [...jobRoles];
    updatedRoles[index].selected = !updatedRoles[index].selected;
    setJobRoles(updatedRoles);
  };

  const [selectedSalaryType, setSelectedSalaryType] = useState("");

  const handleSalaryTypeChange = (event) => {
    setSelectedSalaryType(event.target.value);
    console.log("Selected salary type:", event.target.value);
  };
  // 
  const handleReset = () => {
    setSelectedExperience([]);
    setSelectedEmploymentType("");
    setSelectedSalaryType("");
    setLocations(locations.map((location) => ({ ...location, selected: false })));
    setJobRoles(jobRoles.map((role) => ({ ...role, selected: false })));
  };


  const [filteredData, setFilteredData] = useState([]);

  console.log(filteredData, "Filtered Data ==>");

  
  const ApplyFilters = async () => {
   
    console.log(noDataFound,'noDataFound----filter');
    const filtered = {  
      location: locations.filter((location) => location.selected).map((location) => location.location),
      employee_type: selectedEmploymentType,
      job_role: jobRoles.filter((role) => role.selected).map((role) => role.role),
      salary_range: selectedSalaryType,
      experience: selectedExperience,
    };
    const searchResult = null
    setsearchJob(searchResult)
    setcompanyList(null)
    setFilteredData(filtered);
    setJobData(null)
    
 
    try {
      const response = await fetch(

        `${BASE_URL}/filter_job/`,        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filtered),
        }
      );
      const FilterData = await response.json();
      console.log(FilterData,'FilterData');
      if (FilterData.status === true){
        const FilterResponse = FilterData.data
        // setApplyFilter(FilterResponse)
        console.log(FilterResponse,"<====filter-Response");
        // setNoResult(false)
        setFilterDataUse(FilterResponse);
        localStorage.setItem("No_result", JSON.stringify(false));

      
      localStorage.setItem("Filter_result", JSON.stringify(FilterResponse));
      const storedDataToUse = JSON.parse(localStorage.getItem("Filter_result"));
      console.log(storedDataToUse, 'storedDataToUse------->');
      // Check if storedDataToUse is equal to dataToUse
      if (storedDataToUse && JSON.stringify(storedDataToUse) === JSON.stringify(FilterResponse)) {
        // If equal, set resultdataToUse to storedDataToUse
        localStorage.setItem("Filter_result", JSON.stringify(FilterResponse));
        localStorage.removeItem("Search_result");
          localStorage.removeItem("Employee_type_result");
          localStorage.removeItem("Company_result");
      } else {
        // If not equal, remove the previous dataToUse from localStorage
        localStorage.removeItem("Employee_type_result");
        localStorage.removeItem("Search_result");
          localStorage.removeItem("Company_result");
        // Update localStorage with the new dataToUse
        localStorage.setItem("Filter_result", JSON.stringify(FilterResponse));
      }
    }
    else{
      localStorage.removeItem("Search_result");
      localStorage.removeItem("Employee_type_result");
      localStorage.removeItem("Company_result");
      localStorage.removeItem("Filter_result");
      // const applyFilterResult = ""
      // setApplyFilter(applyFilterResult)
      setFilterDataUse("")
      setNoResult(true)
      setPageButton(false)
      localStorage.setItem("No_result", JSON.stringify(true));
    }
       
      console.log(FilterData.status,"status===>");
      const noResult = JSON.parse(localStorage.getItem("No_result"));
      console.log(noResult,'noResult---filter');
      setNoDataFound(noResult);
      // if (FilterData.status === false) {
       
      //   console.log("Filter false====>");
      //   return  
      // } 
      console.log("Data successfully posted to backend");
    } catch (error) {
      // setErrorOne(error)
      console.error("Error posting data to backend:", error.message);
    }

  }; 
  // Reload

  useEffect(() => {
    const noResult = JSON.parse(localStorage.getItem("No_result"));
    setNoDataFound(noResult);
  }, []); 
  

  // if (errorOne) {
  //   return <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px' }}
  //   >Error: Server Not Responding
  //   </p>; 
  // }
  


  // Filter result


console.log(bookmarkedJobs,'bookmarkedJobs---------');
 // 
 const token = localStorage.getItem("loginToken");

// Serach result
const handleSearch = async () => {
  let isError = false;
  const noResult = JSON.parse(localStorage.getItem("No_result"));
  setNoDataFound(noResult);
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
        setFilterDataUse(searchResponse);
        localStorage.setItem("No_result", JSON.stringify(false));
        handleReset()
        // setNoResult(false)
      } else {
        // alert("Job not Found")
        handleReset()
        setNoResult(true)
        setNoDataFound(true)
        setPageButton(false)
        localStorage.setItem("No_result", JSON.stringify(true));
        // window.location.reload();
        // const storedResultResponse =localStorage.setItem("Filter_response", JSON.stringify(searchResponse));
        // console.log(storedResultResponse,'storedResultResponse--------');
      }
      const noResult = JSON.parse(localStorage.getItem("No_result"));
      console.log(noResult,'noResult---filter');
      setNoDataFound(noResult);
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

  // useEffect to update bookmarkedJobs and pageButton
  useEffect(() => {
    if (FilteResultData !== "" && FilteResultData.length > 0) { 
      const savedjob = FilteResultData.map(job => job.saved);
      const savedjobId = FilteResultData.filter(job => job.saved === "Saved").map(job => job.id);
      
      if (savedjob.includes("Saved")) {
        setBookmarkedJobs(prevBookmarkedJobs => [...prevBookmarkedJobs, ...savedjobId]);
      }
      
      if (FilteResultData.length >= 5) {
        setPageButton(true);
      }
    }
  }, [FilteResultData]);



 const handleBookmark = async (jobId) => {
     const bookmarkData = {
         token,
         job_id: jobId,
     };
 
     try {
         
         let response;
 
         // Check if the job is already bookmarked
         if (bookmarkedJobs.includes(jobId)) {
             // If already bookmarked, send data to update the bookmark
             response = await fetch(`${BASE_URL}/delete_saved_job/`, {
                 method: 'DELETE',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(bookmarkData),
             });
         } else {
             // If not bookmarked, send data to save the job as a new bookmark
             response = await fetch(`${BASE_URL}/saved_job/`, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(bookmarkData),
             });
         }
 
  if (!response.ok) {
             throw new Error('Failed to update bookmark status for the job');
         } else {
             // If successful, update the bookmark status locally
             if (bookmarkedJobs.includes(jobId)) {
                 // If job is already bookmarked, remove it
                 setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
             } else {
                 // If job is not bookmarked, add it
                 setBookmarkedJobs([...bookmarkedJobs, jobId]);
                 
             }
         }
         console.log('Bookmark status updated successfully for job ID:', jobId);
     } catch (error) {
        //  setErrorTwo(error);
         console.error('Error updating bookmark status for job ID:', jobId, error);
     } finally {
         
     }
 };

  // const [noResult, setNoResult] = useState(false)

  // if(dataToUse === null || dataToUse === undefined){
  //     setNoResult(true)
  //     // alert("Hello Everyone")
      
  // }
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleJobSelect = async (selectedJob) => {
    const Token = localStorage.getItem('loginToken');
    const Token1 = { selectedJob, token: Token };

    try {
        setScrollbar(true);
        setLoading(true);
        const response = await fetch(`${BASE_URL}/job_details/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Token1),
        });
        if (!response.ok) {
            throw new Error('Failed to send selected job data to the backend');
        } else {
            navigate('/JobDetails');
        }
        console.log('Selected job data sent successfully:', selectedJob);
    } catch (error) {
        setScrollbar(false);
        // setErrorTwo(error);
        console.error('Error sending selected job data to the backend:', error);
    } finally {
        setLoading(false);
        setScrollbar(false);
        document.body.style.overflow = 'auto'; // Enable scrollbar
    }
};



  // if (errorTwo) {
  //     return <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px' }}
  //     >Error: Server Not Responding
  //     </p>; 
  //   }



 
  return (
    <Grid container className="containerTop">

      <Grid item xs={4} sm={4} md={4} xl={4}>
      <div style={{marginLeft:'500px',marginTop:'-170px',marginBottom:'-385px',display:'flex'}}>
        {/* <SearchBar /> */}
        <div className={isJobSearchPage ? classes.jobSearchRoot : classes.root}>
        {/* <p className='lineFour'>Discover 50 lakh+ career opportunities</p> */}
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

        </div>
        <div className="job-filter" style={{ width: "80%" }}>
          <div className="title">
            <div className="job-experience">
            <h3>Experience</h3>
              <FormGroup>
                <Grid container>
                  {renderOptions.map((option, index) => (
                    <Grid item xs={5} key={index}>
                      {" "}
                      {/* Divide into two columns */}
                      <div style={{ marginLeft: "20px" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                            style={{padding:"5px"}}
                            color="secondary"
                              checked={selectedExperience.includes(option)}
                              onChange={() => handleExperienceClick(option)}
                            />
                          }
                          label={<span style={{ fontSize: "14px" }}>{option}</span>}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </div>
            {experienceOptions.length > 5 && (
              <IconButton
              className="show-more-button"
                onClick={() => setShowAll(!showAll)}
                color="primary"
                sx={{ fontSize: 15, color:"#5C6BC0 " }}
              >
                {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {showAll ? "Hide" : "Show More"}
              </IconButton>
            )}
          </div>
          <div className="job-location">
            <h3>Locations</h3>
            <Box className="scroll" style={{ width: "100%", height: 250, overflow: "auto" }}>
  <List>
    {locations.map((location, index) => (
      <ListItemButton key={index} onClick={() => handleLocationClick(index)}>
        <Checkbox color="secondary" style={{ padding: "2px" }} checked={location.selected} />
        <ListItemText primary={<span style={{ textTransform: "capitalize", fontSize: "14px" }}>{location.location}</span>} />
      </ListItemButton>
    ))}
  </List>
</Box>
          </div>

          <div className="job-employment">
            <h3> Employment Type </h3>

            <FormGroup>
              <RadioGroup
               color="secondary"
                style={{ marginLeft: "1rem"}}
                name="employment-type"
                value={selectedEmploymentType}
                onChange={handleEmploymentTypeChange}
                defaultValue=""
              >
                {employmentType.map((type, index) => (
                  <FormControlLabel
                  style={{padding:"0px"}}
                    key={index}
                    value={type}
                    control={<Radio color="secondary" />}
                    label={<span style={{ fontSize: "14px" }}>{type}</span>}
                  />
                ))}
              </RadioGroup>
            </FormGroup>
          </div>

          <div className="job-roles">
  <h3 style={{ marginTop: 0,marginBottom:'15px' }}>Job Roles</h3>
  <Box className="scroll" sx={{ width: "100%", height: 270, overflow: "auto" }}>
    <List>
      {jobRoles.map((role, index) => (
        <ListItemButton key={index} onClick={() => handleRoleClick(index)}>
          <Checkbox color="secondary" style={{ padding: "5px" }} checked={role.selected} />
          <ListItemText primary={<span style={{ textTransform: "capitalize", fontSize: "14px" }}>{role.role}</span>} />
        </ListItemButton>
      ))}
    </List>
  </Box>
</div>


          <div className="job-salary">
            <h3>Salary Range</h3>
            <RadioGroup
  style={{ marginLeft: "1rem" }}
  name="salary-type"
  value={selectedSalaryType}
  onChange={handleSalaryTypeChange}
>
  {render.map((type, index) => (
    <FormControlLabel
      style={{ padding: "0px" }}
      key={index}
      value={type}
      control={<Radio color="secondary" />}
      label={<span style={{ fontSize: "14px" }}>{type}</span>} // Decrease font size here
    />
  ))}
</RadioGroup>
            {salaryType.length > 5 && (
              <IconButton
                onClick={() => setShow(!Show)}
                color="primary"
                sx={{ fontSize: 15, color:"#5C6BC0" }}
              >
                {Show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {Show ? "Hide" : "Show More"}
              </IconButton>
            )}
          </div>
          <div className="filter-btn">
          <Button variant="outlined" style={{ color: 'white', backgroundColor: '#5C6BC0' }} onClick={ApplyFilters}>Apply Filters</Button>
          <Button style={{marginLeft:"1rem"}} variant="outlined" color="error" onClick={handleReset}>
          Reset
        </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={8} sm={8} md={8} xl={8}>
        
  {noDataFound &&
  <div style={{marginTop:'200px',marginLeft:'-100px'}}>
  {/* <h1>No Result Found</h1> */}
  <div className="dashboardemployeerAccount" style={{marginTop:'75px',marginBottom:"-30px"}}>
        <div className='dashboardemployeerAccount-background'>
          <img 
            src={Error} 
            alt='404' 
            className='dashboardemployeerNotRegister' 
            style={{ borderRadius: "10px" }} 
          />
          <br />
          <h5 className='dashboardemployeererrorText'>No Result Found..!</h5>
        </div>
        </div>
  </div>}
       {currentJobs && currentJobs !== "" &&
        <div className="job-result" style={{ marginTop: '200px' }}>
        {currentJobs.map((job, index) => (
          <div key={index} className="job-box" >
            <div onClick={() => handleJobSelect(job)} >
              <div className="job-top">
                <div className="company-img">
                  {job.company_logo_path && job.company_logo_path.includes('data:image') ? (
                    <img src={job.company_logo_path} alt="Company Logo" />
                  ) : (
                  <img src={`https://backendcompanylogo.s3.eu-north-1.amazonaws.com/${job.company_logo_path}`} alt="Company Logo" />
                  )}
                </div>    
                <div className="job-heading">
                  <div>{job.job_title}</div>
                  <div className="company-name1">{job.company_name}</div>
                </div>
              </div>

                <div className="brief" style={{ marginBottom: '8px', whiteSpace: 'nowrap', overflow: 'hidden',maxWidth:'650px', textOverflow: 'ellipsis' }}>
                  <span className="brief-label"><BsFileEarmarkTextFill/> Job Description : </span> {job.job_description}
                </div>
            
               <div style={{ display: 'inline-block', gap: '10px' }}>
                  <div className="job-brief">
                    <span className="brief-label"><FaLocationDot  icon={faMapMarkerAlt} /></span>
                      {job.location && job.location.map((location, index) => (
                      <span key={index} className="brief11" style={{ marginRight: '5px' }}>{location}</span>
                      ))}
                  </div>
                  <div className="job-brief">
                    <span className="brief-label"><FaIndianRupeeSign icon={faMoneyBillAlt} /></span> {job.salary_range}
                   </div>
                  <div className="job-brief">
                      <span className="brief-label"><BsFillBagCheckFill /></span> {job.experience}
                   </div>
                  </div>
                  <div style={{ display: 'flex',marginTop:"5px" }}> 
                     <div className="job-brief">
                        <span className="brief-label"><BsFillFileCheckFill/> Job Role : </span>{job.job_role}
                  </div>  
                  <div className="job-brief">
                    <span className="brief-label"><BsPersonFillCheck icon={faBuilding} /> Openings : </span>{job.no_of_vacancies}
                    </div>
                    </div>
                  <div className="brief2" style={{marginBottom:"10px" }}>
                    <span className="brief-label"><BsPersonSquare  icon={faBuilding} /> Employee Type : </span>{job.employee_type}
                  </div>         
            </div>

              {/* Bottom of the job */}
              <div style={{ backgroundColor: '#a2beda',padding:"10px", margin: "0 -20px -20px -20px",borderRadius:"10px", cursor:"default" }}>
              <div className="filter-skill-set">
                {job.skills && job.skills.map((skills, index) => (
                  // <span key={index} className="brief11" style={{ marginRight: '5px' }}>{skills}</span>
                  <span key={index} className="skill">
                  <span className="filter-skill-text">{skills}</span>
                </span>
                ))}
              </div>  
              <div className="created-at">
                  <span className="brief-label1"><FaClockRotateLeft icon={faBuilding} /><span className="text"> {job.created_at} ago </span></span> 
                  <span className="save-icon" style={{cursor:"pointer"}} onClick={() => handleBookmark(job.id)} > 
                  {bookmarkedJobs.includes(job.id) ? <BsFillBookmarkCheckFill /> : <BsFillBookmarksFill />}
                  {bookmarkedJobs.includes(job.id) ? 'Saved' : 'Save'}
                  </span>
                </div>           
              </div>          
          </div>
        ))}
        </div> }

        
 {PageButton && (
  <div style={{ position: 'relative', marginTop: 'auto', padding: '5px 100px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 50px 0px 0px' }}>
    <Button
      variant="contained"
      style={{ backgroundColor: "#5C6BC0", color: "white", width: '30px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <NavigateBeforeIcon />
    </Button>
    <Button
      variant="contained"
      style={{ backgroundColor: "#5C6BC0", color: "white", width: '50px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => paginate(currentPage + 1)}
      disabled={indexOfLastJob >= FilteResultData.length}
    >
      <NavigateNextIcon />
    </Button>
  </div>
</div>

 
  )}
  

      
      </Grid>
    </Grid>
  );
};

export default Filter1;
