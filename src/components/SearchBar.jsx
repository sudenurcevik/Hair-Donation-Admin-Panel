import React, { useState } from "react";
import { InputBase, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text = searchText) => {
    onSearch(text);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    handleSearch("");
  };

  const showClearIcon = searchText.length > 0;

  return (
    <>
      <InputBase
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          width: { xs: "70%", sm: "50%", md: "30%" },
          borderRadius: "9999px",
          padding: "0.25rem",
          paddingLeft: "1rem",
          // paddingRight: showClearIcon ? "2.5rem" : "1rem", // Adjust padding based on the presence of the clear icon
          marginRight: 1,
          border: "1px solid gray",
        }}
        endAdornment={
          <InputAdornment position="end">
            {showClearIcon && ( // Show the clear icon only when there is text in the search input
              <IconButton
                color="primary"
                onClick={handleClearSearch}
                edge="end"
                size="small"
              >
                <ClearIcon sx={{ color: "#FF4B00" }} />
              </IconButton>
            )}
            <IconButton
              color="primary"
              onClick={() => handleSearch(searchText)}
              edge="end"
              size="small"
            >
              <SearchIcon sx={{ color: "#FF4B00" }} />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
};

export default SearchBar;
