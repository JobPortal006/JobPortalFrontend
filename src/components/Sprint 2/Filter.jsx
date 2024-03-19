import React, { useState, useEffect, useContext } from "react";
import {Checkbox, FormControlLabel, FormGroup, IconButton, Grid, Radio, RadioGroup,Typography} from "@mui/material";
import { Box, List, ListItemButton, ListItemText, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilteredResults from "./FilteredResults";
// import { useNavigate } from "react-router-dom";
import "../Sprint 2/FilterPage.css";
import UserContext from "./contextFilter";
import SearchBar from "../HomePage/searchBar";
import BASE_URL from '../CommonAPI';

const Filter = () => {
  const [showAll, setShowAll] = useState(false);
  const [Show, setShow] = useState(false);
  const [errorOne, setErrorOne ] = useState(null)

  const {oneData,setData,searchJob,setsearchJob,companyList,setcompanyList,jobData,setJobData} = useContext(UserContext);
  console.log(searchJob,'=====search job data')
console.log(oneData, "=====raghul data");

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

  const renderOptions = showAll
    ? experienceOptions
    : experienceOptions.slice(0, 5);

  const render = Show ? salaryType : salaryType.slice(0, 5);

  const [selectedExperience, setSelectedExperience] = useState([]);

  // Function to handle changes in selected experience levels
  // const handleExperienceChange = (event) => {
  //   setSelectedExperience(event.target.value);
  //   console.log("Selected experience levels:", event.target.value);
  // };

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
        const response = await fetch(`${BASE_URL}/location/`);
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


  // Job Filter
  const [component,setComponent] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  console.log(filteredData, "Filtered Data ==>");

  


  const ApplyFilters = async () => {
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
        `${BASE_URL}/filter_job/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filtered),
        }
      );
      const FilterData = await response.json();
      const FilterResponse = FilterData.data
      console.log(FilterResponse,"<====filter-Response");
      

      if(FilterResponse !== null){
        setData(FilterResponse)
        
      }else{
        setsearchJob(FilterResponse)
        
      }
      console.log(FilterData.status,"status===>");
      if (FilterData.status !== true) {
        // alert("Failed to post data to backend");
        return <p>Error: Server Not Responding</p>
        
      } else {
        
        setComponent(true)
      }
      console.log("Data successfully posted to backend");
    } catch (error) {
      setErrorOne(error)
      console.error("Error posting data to backend:", error.message);
    }

   

  }; 

  

  if (errorOne) {
    return <p style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '30px' }}
    >Error: Server Not Responding
    </p>; 
  }
  

  return (
    <Grid container>
    
      <Grid item xs={4} sm={4} md={4} xl={4}>
      <div style={{marginLeft:'500px',marginTop:'-160px',marginBottom:'-385px',display:'flex'}}>
        <SearchBar />

        </div>
        <div className="job-filter" style={{ width: "80%" }}>
          <div className="title">
            <h1>Filter</h1>
            <div className="job-experience">
            <h3>Experience level</h3>
              <FormGroup>
                <Grid container>
                  {renderOptions.map((option, index) => (
                    <Grid item xs={6} key={index}>
                      {" "}
                      {/* Divide into two columns */}
                      <div style={{ marginLeft: "1.5rem" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                            color="secondary"
                              checked={selectedExperience.includes(option)}
                              onChange={() => handleExperienceClick(option)}
                            />
                          }
                          label={option}
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
                sx={{ fontSize: 17, color:"#5C6BC0 " }}
              >
                {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {showAll ? "Hide" : "Show More"}
              </IconButton>
            )}
          </div>
          <div className="job-location">
            <h3>Locations</h3>
            <Box className="scroll"  style={{ width: "90%", height: 300, overflow: "auto" }}>
              <List>
                {locations.map((location, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleLocationClick(index)}
                  >
                    <Checkbox color="secondary" checked={location.selected} />
                    <ListItemText primary={location.location} />
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
                style={{ marginLeft: "1rem" }}
                name="employment-type"
                value={selectedEmploymentType}
                onChange={handleEmploymentTypeChange}
                defaultValue=""
              >
                {employmentType.map((type, index) => (
                  <FormControlLabel
                    key={index}
                    value={type}
                    control={<Radio color="secondary" />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormGroup>
          </div>

          <div className="job-roles">
            <h3>Job Roles</h3>
            <Box className="scroll" sx={{ width: "90%", height: 300, overflow: "auto" }}>
              <List>
                {jobRoles.map((role, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleRoleClick(index)}
                  >
                    <Checkbox color="secondary" checked={role.selected}  />
                    <ListItemText primary={role.role} />
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
                  key={index}
                  value={type}
                  control={<Radio color="secondary" />}
                  label={type}
                />
              ))}
            </RadioGroup>
            {salaryType.length > 5 && (
              <IconButton
                onClick={() => setShow(!Show)}
                color="primary"
                sx={{ fontSize: 17, color:"#5C6BC0" }}
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
       {component && <FilteredResults  />}
       {searchJob && <FilteredResults  />}
       {companyList && <FilteredResults  />}
       {jobData && <FilteredResults  /> }

      </Grid>
    </Grid>
  );
};

export default Filter;