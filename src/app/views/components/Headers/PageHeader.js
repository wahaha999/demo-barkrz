import React, { useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { Img } from "react-image";

import useStyles from "./style";

const PageHeader = (props) => {
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("load", props.reveal);
  }, []);

  return (
    <Box className={`${classes.container} ${classes.container1} reveal`}>
      <Img
        className={classes.background}
        src={require("@app/assets/svgs/new/Hero_Header_Bg.svg").default}
      />
       <Img
       className={classes.background1}
        src={require("@app/assets/svgs/new/Graphic_Elements1.svg").default}
      />
      <Box className={`${classes.mainDescription} ${classes.mainDescription1} reveal`}>
        <Typography className={classes.span1} component="span">
          {props.decs}
        </Typography>
        <Typography className={`${classes.h1} ${classes.h11}` } component="h1">
          {props.title}
        </Typography>
      </Box>
    </Box>
  );
};

export default PageHeader;
