import React, { useState, useEffect, useContext } from "react";
import {Checkbox, FormControlLabel, FormGroup, IconButton, Grid, Radio, RadioGroup} from "@mui/material";
import { Box, List, ListItemButton, ListItemText, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilteredResults from "./FilteredResults";
// import { useNavigate } from "react-router-dom";
import "../Sprint 2/FilterPage.css";
import UserContext from "./contextFilter";

const Filter = () => {
  const [showAll, setShowAll] = useState(false);
  const [Show, setShow] = useState(false);

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
        const response = await fetch("http://192.168.1.39:8000/location/");
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
        const response = await fetch("http://192.168.1.39:8000/job_role/");
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

  // Job Filter
  const [component,setComponent] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  console.log(filteredData, "Filtered Data ==>");

  const {oneData,setData} = useContext(UserContext);
console.log(oneData, "010101010110");

  const ApplyFilters = async () => {
    const filtered = {  
      location: locations.filter((location) => location.selected).map((location) => location.location),
      employee_type: selectedEmploymentType,
      job_role: jobRoles.filter((role) => role.selected).map((role) => role.role),
      salary_range: selectedSalaryType,
      experience: selectedExperience,
    };
    setFilteredData(filtered);
    // location, employee_type, job_role, salary_range
    try {
      const response = await fetch(
        "http://192.168.1.57:8000/filter_singleValue/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filtered),
        }
      );
      const FilterData = await response.json();
      console.log(FilterData,"<====filter-Response");
      setData(FilterData)
      if (!response.ok) {
        throw new Error("Failed to post data to backend");
      } else {
        setComponent(true)
      }
      console.log("Data successfully posted to backend");
    } catch (error) {
      console.error("Error posting data to backend:", error.message);
    }

  }; 



  return (
    <Grid container>
      <Grid item xs={4} sm={4} md={4} xl={4}>
        <div className="job-filter" style={{ width: "100%" }}>
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
                sx={{ fontSize: 15 }}
              >
                {showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {showAll ? "Hide" : "Show More"}
              </IconButton>
            )}
          </div>
          <div className="job-location">
            <h3>Locations</h3>
            <Box className="scroll"  sx={{ width: "100%", height: 300, overflow: "auto" }}>
              <List>
                {locations.map((location, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleLocationClick(index)}
                  >
                    <Checkbox checked={location.selected} />
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
                    control={<Radio />}
                    label={type}
                  />
                ))}
              </RadioGroup>
            </FormGroup>
          </div>

          <div className="job-roles">
            <h3>Job Roles</h3>
            <Box className="scroll" sx={{ width: "140%", height: 300, overflow: "auto" }}>
              <List>
                {jobRoles.map((role, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => handleRoleClick(index)}
                  >
                    <Checkbox checked={role.selected} />
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
                  control={<Radio />}
                  label={type}
                />
              ))}
            </RadioGroup>
            {salaryType.length > 5 && (
              <IconButton
                onClick={() => setShow(!Show)}
                color="primary"
                sx={{ fontSize: 15 }}
              >
                {Show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {Show ? "Hide" : "Show More"}
              </IconButton>
            )}
          </div>
          <div className="filter-btn">
          <Button variant="outlined" onClick={ApplyFilters}>Apply Filters</Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={8} sm={8} md={8} xl={8}>
       {component && <FilteredResults two={oneData} />}
      </Grid>
    </Grid>
  );
};

export default Filter;
