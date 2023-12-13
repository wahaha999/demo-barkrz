import { Box, Button, Slider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Container, Input, Progress } from "reactstrap";
import "./petflow.scss";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "../CustomInput/CustomInput";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Pet_Flow_Information } from "@app/actions/pet";
import Alert from "@app/views/components/Alert";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
    color: "#1F1F39",
    fontSize: "25px",
    fontFamily: "All Round Gothic",
  },
  margin: {
    margin: "80px 0",
  },
  input: {
    background: "#F2F3F5",
    borderRadius: "27px",
    margin: "10px 0 20px",
    "&::placeholder": {
      fontFamily: "Roboto",
      fontStyle: "italic",
      fontSize: "14px",
      color: "#ACABAB",
    },
  },
});

export const Health = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const petInformation = useSelector((state) => state.petsInformation);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState("");

  const [petInfo, setPetInfo] = useState({
    neutered: petInformation?.petFlowData?.neutered ?? "",
    vaccinated: petInformation?.petFlowData?.vaccinated ?? "",
    disability: petInformation?.petFlowData?.disability ?? "",
    weight: petInformation?.petFlowData?.weight ?? 0,
    disabilityInfo: petInformation?.petFlowData?.disabilityInfo ?? "",
  });
  const [slider, setSlider] = useState(
    petInformation?.petFlowData?.weight ?? 0
  );
  const [neuteredClass, setNeuteredClass] = useState();
  const [vaccineClass, setVaccineClass] = useState();
  const [disableClass, setDisableClass] = useState();

  const handleChangeNeutered = (value) => {
    if (value === "1") {
      setNeuteredClass("1");
    } else {
      setNeuteredClass("0");
    }
    setPetInfo({ ...petInfo, neutered: value });
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...petInfo,
        neutered: value,
      })
    );
  };
  const handleChangeVaccinated = (value) => {
    if (value === "yes") {
      setVaccineClass("yes");
    } else {
      setVaccineClass("no");
    }
    setPetInfo({ ...petInfo, vaccinated: value });
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...petInfo,
        vaccinated: value,
      })
    );
  };
  const handleChangeDisability = (value) => {
    if (value === "yes") {
      setDisableClass("yes");
    } else {
      setDisableClass("no");
    }
    setPetInfo({ ...petInfo, disability: value });
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...petInfo,
        disability: value,
      })
    );
  };

  const validate = () => {
    if (petInfo.neutered === "") {
      setValidationError(true);
      setValidationErrorMsg(
        `Please set if they are ${
          petInformation?.petFlowData?.gender === "male" ? "Neutered" : "Spayed"
        }`
      );
      return false;
    }
    if (petInfo.vaccinated === "") {
      setValidationError(true);
      setValidationErrorMsg("Please set Vaccinated or not");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validate()) {
      return;
    }
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...petInfo,
        weight: slider,
      })
    );
    props.handleNextStep(5);
  };
  const AfterValidation = () => {
    setValidationError(false);
  };

  const valuetext = (value) => {
    setSlider(value);
  };

  const handleChangeMedCondition = ({ target: { name, value } }) => {
    setPetInfo({ ...petInfo, [name]: value });
    dispatch(
      Pet_Flow_Information({
        ...petInformation?.petFlowData,
        ...petInfo,
        medicalCondition: value,
      })
    );
  };

  return (
    <>
      <Box className="pet-health-page pet-all-page">
        <Header handlePreStep={props.handlePreStep} page={3} current={4} />
        <Box className="page-padding">
          <Box my={4} className="header-text">
            <div className={classes.bold}> Health </div>
            <div className="labeltext">
              {" "}
              Let's set some of their basic health info{" "}
            </div>
          </Box>
          <Box>
            <h1 className="slider-lbs">{slider || 0} lbs</h1>
            <p className="slider-kg">~{(slider / 2.2).toFixed(2) || 0} kg</p>
          </Box>
          <Box className={classes.margin}>
            {/* <Progress value="25" /> */}
            <Slider
              max={150}
              defaultValue={slider}
              getAriaValueText={valuetext}
            />
          </Box>

          <Box className="health-section">
            <div className="d-flex justify-content-between align-items-center middle">
              <div className="font-weight-bold">
                {petInformation?.petFlowData?.gender === "male"
                  ? "Neutered"
                  : "Spayed"}
              </div>
              <div className="buttons d-flex">
                <div
                  className={`${
                    neuteredClass === "1" ||
                    petInformation?.petFlowData?.neutered === "1"
                      ? "active yes"
                      : "yes"
                  }`}
                  mr={5}
                  onClick={() => handleChangeNeutered("1")}
                >
                  Yes
                </div>
                <div
                  className={`${
                    neuteredClass === "0" ||
                    petInformation?.petFlowData?.neutered === "0"
                      ? "active no"
                      : "no"
                  }`}
                  onClick={() => handleChangeNeutered("0")}
                >
                  No
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center middle">
              <div className="font-weight-bold">Vaccinated</div>
              <div className="buttons d-flex">
                <div
                  className={`${
                    vaccineClass === "yes" ||
                    petInformation?.petFlowData?.vaccinated === "yes"
                      ? "active yes"
                      : "yes"
                  }`}
                  mr={5}
                  onClick={() => handleChangeVaccinated("yes")}
                >
                  Yes
                </div>
                <div
                  className={`${
                    vaccineClass === "no" ||
                    petInformation?.petFlowData?.vaccinated === "no"
                      ? "active no"
                      : "no"
                  }`}
                  onClick={() => handleChangeVaccinated("no")}
                >
                  No
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center middle">
              <div className="font-weight-bold">Disability</div>
              <div className="buttons d-flex">
                <div
                  className={`${
                    disableClass === "yes" ||
                    petInformation?.petFlowData?.disability === "yes"
                      ? "active yes"
                      : "yes"
                  }`}
                  mr={5}
                  onClick={() => handleChangeDisability("yes")}
                >
                  Yes
                </div>
                <div
                  className={`${
                    disableClass === "no" ||
                    petInformation?.petFlowData?.disability === "no"
                      ? "active no"
                      : "no"
                  }`}
                  onClick={() => handleChangeDisability("no")}
                >
                  No
                </div>
              </div>
            </div>
            {(petInfo?.disability === "yes" ||
              petInformation?.petFlowData?.disability === "yes") && (
              <Input
                placeholder="Enter Disability information"
                className={classes.input}
                label="Disability Info"
                name="medicalCondition"
                onChange={handleChangeMedCondition}
                type="text"
                value={petInfo.medicalCondition}
              />
            )}
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
