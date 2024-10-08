import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({ onSearch, sx }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ borderRadius: 0, ...sx }}>
      <TextField
        autoComplete="off"
        className="search-bar"
        style={{ border: '0' }}
        size="small"
        placeholder="Search for product"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            onSearch(searchTerm);
          }
        }}
        value={searchTerm}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => onSearch(searchTerm)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchTerm('')}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
