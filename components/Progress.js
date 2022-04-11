import { styled, keyframes } from "@nextui-org/react";

const thumb = keyframes({
  to: {
    transform: "initial"
  }
});

const Progress = styled("span", {
  flex: 1,
  display: "block",
  height: "3px",
  background: "rgb(0 0 0 / 65%)",
  margin: "$2 !important",
  borderRadius: "3px",
  overflow: "hidden",
  zIndex: 999,
  "&:after": {
    content: "",
    display: "none",
    height: "inherit",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "3px",
    transform: "translateX(-100%)",
    animation: `${thumb} 5s forwards linear`
  },
  variants: {
    active: {
      true: {
        "&:after": {
          display: "block"
        }
      }
    }
  }
});

export default Progress;
