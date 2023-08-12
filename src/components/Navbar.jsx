import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import authService from "../services/auth.service";
import secondLogo from "../assets/logo.png";
import SessionHelper from "../helpers/SessionHelper";
import Badge from "@mui/material/Badge";
import { ThemeProvider, styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8000ba",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const settings = ["Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState(null);
  const user = SessionHelper.getUser();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === "Logout") {
      authService.logout();
      window.location.reload();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        style={{
          background: "linear-gradient(to right, #8000ba, #ff4b00)",
          top: 0,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <img
                src={secondLogo}
                alt="logo"
                style={{
                  width: "180px",
                  height: "auto",
                  marginRight: 15,
                }}
              />
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              <img
                src={secondLogo}
                alt="logo"
                style={{
                  width: "150px",
                  height: "auto",
                  mr: 1,
                  color: "white",
                  borderRadius: "5px",
                }}
              />
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="h5"
              sx={{
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: { xs: ".9rem", md: "1.2rem", lg: "1.5rem" },
                letterSpacing: ".2rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Hair Donation Administration
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Tooltip title="Logout">
                <IconButton
                  onClick={() => handleCloseUserMenu("Logout")}
                  sx={{ p: 0, fontSize: "1rem", color: "white" }} // Adjust the font size here
                >
                  Logout
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
