import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import CustomSnackbar from "../components/Snackbar";
import SessionHelper from "../helpers/SessionHelper";
import authService from "../services/auth.service";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "styled-components";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function LoginPage({ update, setUpdate }) {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:1020px)");
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("info");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      email: email,
      password: password,
    };
    console.log(user);
    console.log(password);
    const res = await authService.login(user);
    console.log(res);
    if (res?.status === 200) {
      SessionHelper.setUser(res?.data);
      setUpdate(!update);
      history?.location?.state
        ? history.push(history?.location?.state?.from?.pathname)
        : history.push("/companies");
    } else {
      setSnackbarMessage(res?.data?.message);
      setSnackbar(true);
      setSeverity("error");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container fluid>
          <Grid align="center">
            {snackbar && (
              <CustomSnackbar message={snackbarMessage} severity={severity} />
            )}
            <Paper
              elevation={3}
              className={
                matches ? classes.paperStyle : classes.paperStyleMobile
              }
            >
              <Grid align="center">
                <img
                  alt="logo"
                  src={logo}
                  style={{ width: "70%", height: "" }}
                />
                <h2 className={classes.title}>Log In</h2>
              </Grid>
              <Grid className={classes.inputGrid}>
                <label className={classes.label}>Email</label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <label className={classes.label}>Password</label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </Grid>

              <div className={classes.buttonContainer}>
                <Button
                  type="submit"
                  onClick={(e) => {
                    if (email === "") {
                      setSnackbarMessage("Please enter your email");
                      setSeverity("error");
                      setSnackbar(true);
                    } else if (password === "") {
                      setSnackbarMessage("Please enter your password");
                      setSeverity("error");

                      setSnackbar(true);
                    } else {
                      handleLogin(e);
                    }
                  }}
                >
                  {loading ? (
                    <>
                      Logging in...
                      <CircularProgress
                        size={16}
                        style={{ marginLeft: "8px" }}
                      />
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </Paper>
          </Grid>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

const useStyles = makeStyles({
  paperStyle: {
    padding: "3% 5%",
    width: "35%",
    margin: "10% auto",
    background: "linear-gradient(to right, #8000ba, #ff4b00)",
  },
  paperStyleMobile: {
    padding: "3% 5%",
    width: "80%",
    margin: "10% auto",
    background: "linear-gradient(to right, #8000ba, #ff4b00)",
  },
  title: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "lighter",
    marginTop: "20%",
  },
  label: {
    display: "block",
    width: "100%",
    color: "#505050",
    textAlign: "left",
    fontSize: "1rem",
    margin: "3% 0 0",
    color: "white",
  },
  altText: {
    color: "#505050",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: 10,
  },
  inputGrid: {
    marginTop: "2rem",
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bolder",
  },
  signUp: {
    color: "#505050",
    fontSize: "1rem",
    marginTop: 45,
  },
});
