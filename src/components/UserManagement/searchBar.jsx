import React from 'react';
import { makeStyles, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { MdSearch, MdLocationOn, MdWork } from 'react-icons/md';

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
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    background: '#ffffff',
    borderRadius: 24,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
  },
  formControl: {
    minWidth: 120,
    zIndex: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
    background: '#ff4d4d',
    color: '#ffffff',
    '&:hover': {
      background: '#ff3333',
    },
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));


const SearchBar = () => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = React.useState('');
    const [category1, setCategory1] = React.useState('');
    const [category2, setCategory2] = React.useState('');
  
    const handleSearch = () => {
      const searchObject = {
        searchValue,
        category1,
        category2,
      };
  
      console.log('Search Object:', searchObject);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchInput}
            variant='standard'
            label="Search"
            color="secondary"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <MdSearch className={classes.icon} />
              ),
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>
              <MdLocationOn className={classes.icon} />
              Locations
            </InputLabel>
            <Select
              variant='standard'
              color="secondary"
              value={category1}
              onChange={(e) => setCategory1(e.target.value)}
            >
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>
              <MdWork className={classes.icon} />
              Experience
            </InputLabel>
            <Select
              variant='standard'
              color="secondary"
              value={category2}
              onChange={(e) => setCategory2(e.target.value)}
            >
              <MenuItem value={1}>Option A</MenuItem>
              <MenuItem value={2}>Option B</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  
