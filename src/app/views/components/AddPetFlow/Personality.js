import { Pet_Flow_Information } from "@app/actions/pet";
import { temperamentArr } from "@app/constants";
import { Box, Button, Checkbox, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Input, Row } from "reactstrap";
import { Header } from "./Header";
import Alert from "@app/views/components/Alert";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
    color: "#1F1F39",
    fontSize: "25px",
    fontFamily: "All Round Gothic",
  },
});

export const Personality = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const petInformation = useSelector((state) => state.petsInformation);
  const [personalInfo, setPersonalInfo] = useState({
    temperament:
      petInformation?.petFlowData?.temperament ??
      Array(Object.keys(temperamentArr).length)
        .fill(0)
        .toString()
        .replace(/,/g, ""),
    notes: petInformation?.petFlowData?.notes ?? "",
  });
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState("");

  const handleCheckboxValue = (e, type) => {
    if (type === "text") {
      const { name, value } = e.target;
      setPersonalInfo({ ...personalInfo, [name]: value });
    }
  };

  const handleTemperamentChange = (e, index) => {
    const { checked } = e.target;
    let replacement = "0";
    if (checked === true) {
      replacement = "1";
    }
    setPersonalInfo((prevState) => ({
      ...prevState,
      temperament: personalInfo?.temperament?.replaceAt(index, replacement),
    }));
  };

  const validate = () => {
    if (!personalInfo?.temperament.includes("1")) {
      setValidationError(true);
      setValidationErrorMsg("Please select at least one personality trait.");
      return false;
    } else {
      return true;
    }
  };

  const handleNext = () => {
    if (!validate()) {
      return;
    }
    dispatch(
      Pet_Flow_Information({ ...petInformation?.petFlowData, ...personalInfo })
    );
    props.handleNextStep(6);
  };

  const AfterValidation = () => {
    setValidationError(false);
  };

  return (
    <>
      <Box className="pet-per-page pet-all-page">
        <Header handlePreStep={props.handlePreStep} page={4} current={5} />
        <Box className="page-padding">
          <Box my={4} className="header-text">
            <div className={classes.bold}> Personality </div>
            <div className="labeltext">
              {" "}
              Select your pet's personality traits{" "}
            </div>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Row className="p-3 text-center">
              {Object.keys(temperamentArr).map(function (keyName, keyIndex) {
                return (
                  <Col md={6} xs={6} key={keyIndex}>
                    <label className="custom-check-box">
                      {temperamentArr[keyName]}
                      <input
                        name={keyName}
                        checked={
                          personalInfo.temperament &&
                          personalInfo.temperament[keyIndex] === "1"
                        }
                        onChange={(e) => handleTemperamentChange(e, keyIndex)}
                        type="checkbox"
                      />
                      <span className="checkmark" />
                    </label>
                  </Col>
                );
              })}
            </Row>
          </Box>

          <Box className="extra-notes">
            <div className="note-text">Extra notes</div>
            <Input
              type="textarea"
              cols=""
              rows="6"
              value={personalInfo.notes}
              onChange={(e) => handleCheckboxValue(e, "text")}
              name="notes"
              className="per-textarea"
            />
            <div className="note-text-bottom">
              {" "}
              These notes will appear on your public pet profile{" "}
            </div>
          </Box>

          <Button className="next-button" onClick={handleNext}>
            next
          </Button>
        </Box>
      </Box>
      {validationError && (
        <Alert
          message={validationErrorMsg}
          OnClose={AfterValidation}
          success={false}
        />
      )}
    </>
  );
};
