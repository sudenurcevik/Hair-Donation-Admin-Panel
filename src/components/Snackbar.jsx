import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(-50%) translateY(-100%);
  }
  to {
    transform: translateX(-50%) translateY(0);
  }
`;

const SnackbarWrapper = styled.div`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => {
    switch (props.severity) {
      case "success":
        return "#43a047";
      case "warning":
        return "#ffa000";
      case "error":
        return "#d32f2f";
      default:
        return "#2196f3";
    }
  }};
  border-radius: 4px;
  color: white;
  font-size: 16px;
  animation: ${slideIn} 0.5s ease-in-out;
  z-index: 1000;
`;

const Icon = styled.span`
  margin-right: 10px;
`;

const CustomSnackbar = ({ severity, message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {show && (
        <SnackbarWrapper severity={severity}>
          <Icon>{severity === "error" ? "❌" : "✅"}</Icon>
          {message}
        </SnackbarWrapper>
      )}
    </>
  );
};

export default CustomSnackbar;
