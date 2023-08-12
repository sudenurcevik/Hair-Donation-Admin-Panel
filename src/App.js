import React from "react";
import AppRoutes from "./routes/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f0efec",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
