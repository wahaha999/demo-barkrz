import React, { useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { Img } from "react-image";

import useStyles from "./style";

const LandingPageHeader = (props) => {
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener("load", props.reveal);
  }, []);

  return (
    <Box>
      <Box className={`${classes.container} reveal`}>
        <Img
          className={classes.background}
          src={require("@app/assets/svgs/new/top-background.svg").default}
        />
        <Box className={`${classes.mainDescription} reveal`}>
          <Typography className={classes.span1} component="span">
            Your Favorite
          </Typography>
          <Typography className={classes.h1} component="h1">
            Interactive
          </Typography>
          <Box>
            <Typography className={classes.h1} component="h1">
              Pet ID
            </Typography>
          </Box>
          <Typography className={classes.span01} component="span">
            Securely store your pet’s important information in one interactive
            Pet Profile with built-in alerts, tips, and more.
          </Typography>
          <Button
            variant="outlined"
            href="https://shop.barkrz.com"
            className={classes.btnShop}
          >
            Shop Now
          </Button>
        </Box>
        <Img
          className={classes.animals}
          src={require("@app/assets/svgs/new/phone_hero_max.svg").default}
        />
        <Img
          className={classes.mobileAnimals}
          src={
            require("@app/assets/svgs/new/phone_hero_max_mobile.png").default
          }
        />
      </Box>
    </Box>
  );
};

export default LandingPageHeader;
