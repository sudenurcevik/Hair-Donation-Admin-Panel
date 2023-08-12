import React from "react";
import SessionHelper from "../helpers/SessionHelper";

const LandingPage = (props) => {
  const { history } = props;
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  console.log("LoggedIn = ", isLoggedIn);
  if (isLoggedIn) {
    history.push("companies");
  } else history.push("landing");

  return <></>;
};

export default LandingPage;
