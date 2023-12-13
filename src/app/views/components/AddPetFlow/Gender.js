import React, { useState } from "react";
import { Box, Button } from "@material-ui/core";
import "./petflow.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "./Header";
import { Pet_Flow_Information } from "@app/actions/pet";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@app/views/components/Alert";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
    color: "#1F1F39",
    fontSize: "25px",
    fontFamily: "All Round Gothic",
  },
});

export const Gender = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const petInformation = useSelector((state) => state.petsInformation);

  const [genderInfo, setGenderInfo] = useState({
    gender: petInformation?.petFlowData?.gender ?? "",
  });
  const [age, setAge] = useState(0);
  const [classToggle, setClassToggle] = useState();

  const [validationError, setValidationError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState("");

  const validate = () => {
    if (genderInfo.gender === "") {
      setValidationErrorMsg("Please select a gender.");
      setValidationError(true);
      return false;
    }
    if (age === 0) {
      setValidationErrorMsg(
        "Please set a birthday or estimate the best you can."
      );
      setValidationError(true);
      return false;
    }
    return true;
  };

  const handleClick = (val) => {
    if (val === "male") {
      setClassToggle("male");
    } else {
      setClassToggle("female");
    }
    setGenderInfo({ gender: val });
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...genderInfo,
        gender: val,
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAge(value);
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...age,
        age: value,
      })
    );
  };

  const handleNext = () => {
    if (!validate()) {
      return;
    }
    dispatch(
      Pet_Flow_Information({ ...petInformation?.petFlowData, ...genderInfo })
    );
    props.handleNextStep(4);
  };

  return (
    <>
      <Box className="pet-gender-page pet-all-page">
        <Header handlePreStep={props.handlePreStep} page={2} current={3} />
        <Box className="page-padding">
          <Box my={4} className="header-text">
            <div className={classes.bold}> Gender </div>
            <div className="labeltext"> Is your pet male or female? </div>
          </Box>
          <Box className="upload-section">
            <div
              className={`${
                classToggle === "male" ||
                petInformation?.petFlowData?.gender === "male"
                  ? "section-one active"
                  : "section-one"
              }`}
              onClick={() => handleClick("male")}
            >
              <div className="male-box">
                <img
                  className="gender-male-key"
                  src={
                    require("@app/assets/svgs/petflow/cross-arrow.svg").default
                  }
                  alt=""
                />
              </div>
              <img
                className="petleg-img gender"
                src={
                  require("@app/assets/svgs/petflow/gender-male-leg.svg")
                    .default
                }
                alt=""
              />
              <div className="gender-text male">male</div>
            </div>
            <div
              className={`${
                classToggle === "female" ||
                petInformation?.petFlowData?.gender === "female"
                  ? "section-one female active"
                  : "section-one female"
              }`}
              onClick={() => handleClick("female")}
            >
              <div className="male-box">
                <img
                  className={`${
                    classToggle === "female" ||
                    petInformation?.petFlowData?.gender === "female"
                      ? "gender-key active"
                      : "gender-key"
                  }`}
                  src={
                    require("@app/assets/svgs/petflow/gender-female-key.svg")
                      .default
                  }
                  alt=""
                />
              </div>
              <img
                className="petleg-img gender"
                src={
                  require("@app/assets/svgs/petflow/gender-female-leg.svg")
                    .default
                }
                alt=""
              />
              <div className="gender-text female">female</div>
            </div>
          </Box>
          <Box py={4}>
            <div>
              <span className="font-weight-bold register2Span">Birthday</span>
            </div>
            <input
              type="date"
              name="age"
              value={age}
              onChange={handleChange}
              placeholder="2019"
              className="register2Input"
              min="1980-01-01"
              max="2030-01-01"
            />
          </Box>

          <Button className="next-button" onClick={handleNext}>
            next
          </Button>
        </Box>
      </Box>
      {validationError && (
        <Alert
          message={validationErrorMsg}
          OnClose={() => setValidationError(false)}
          success={false}
        />
      )}
    </>
  );
};
