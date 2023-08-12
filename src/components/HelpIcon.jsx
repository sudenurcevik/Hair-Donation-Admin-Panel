import React, { useState } from "react";
import { Tooltip, IconButton, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  helperIcon: {
    marginLeft: "auto",
    color: "#5E9459",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  helperText: {
    fontFamily: "Poppins",
    fontSize: "14px",
    // fontWeight: "bold",
    color: "white",
    padding: "4px",
  },
  customTooltip: {
    backgroundColor: "#5E9459",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "8px",
  },
  customArrow: {
    color: "#5E9459",
  },
}));

function HelperIcon({ text }) {
  const classes = useStyles();
  const [showHelp, setShowHelp] = useState(false);

  const handleHelpIconClick = () => {
    setShowHelp(true);
  };

  const handleHelpIconClose = () => {
    setShowHelp(false);
  };

  return (
    <Tooltip
      open={showHelp}
      onClose={handleHelpIconClose}
      title={<Typography className={classes.helperText}>{text}</Typography>}
      placement="top"
      enterTouchDelay={0}
      disableFocusListener
      disableHoverListener={!showHelp}
      disableTouchListener={!showHelp}
      arrow
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      <IconButton
        className={classes.helperIcon}
        color="primary"
        onMouseEnter={handleHelpIconClick}
        onMouseLeave={handleHelpIconClose}
        size="large"
      >
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
}

export default HelperIcon;
