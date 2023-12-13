import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Progress } from "reactstrap";

export const Header = (props) => {
  const [process, setProcess] = useState(20);

  useEffect(() => {
    if (props?.current === 1) {
      setProcess(20);
    }
    if (props?.current === 2) {
      setProcess(40);
    }
    if (props?.current === 3) {
      setProcess(50);
    }
    if (props?.current === 4) {
      setProcess(70);
    }
    if (props?.current === 5) {
      setProcess(80);
    }
    if (props?.current === 6) {
      setProcess(95);
    }
  }, [props]);

  return (
    <Box className="pageHeader">
      <Box className="content">
        <div>
          {props?.current === 1 ? (
            <div> </div>
          ) : (
            <img
              className="back-arrow"
              src={require("@app/assets/svgs/petflow/back-arrow.svg").default}
              alt=""
              onClick={() => props.handlePreStep(props?.page)}
            />
          )}
        </div>
        <Progress value={process} />
        <div></div>
      </Box>
    </Box>
  );
};
