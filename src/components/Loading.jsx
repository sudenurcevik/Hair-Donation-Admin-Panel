import { CircularProgress, Container, CssBaseline } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <CssBaseline>
      <Container
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#5E714E",
          fontFamily: "Poppins",
        }}
      >
        <CircularProgress color="inherit" />
        <h1 fontWeight="ligther">Loading...</h1>
      </Container>
    </CssBaseline>
  );
}
