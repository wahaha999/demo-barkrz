import { Box, Button } from "@material-ui/core";
import React, { createRef, useEffect, useState } from "react";
import { Input } from "reactstrap";
import "./petflow.scss";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@app/views/components/Alert";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { Pet_Flow_Information } from "@app/actions/pet";
import heic2any from "heic2any";
import axios from "axios";
import Autocomplete from "@app/views/components/AutoComplete";
import { logFbEvent } from "@src/firebase";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
    color: "#1F1F39",
    fontSize: "25px",
    fontFamily: "All Round Gothic",
  },
  inputLabel: {
    fontFamily: "All Round Gothic",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "15px",
    lineHeight: "18px",
    color: "#1F1F39",
    margin: "10px 0",
  },
  input: {
    background: "#F2F3F5",
    borderRadius: "27px",
    margin: "10px 0 20px",
  },
});

export const Information = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const petInformation = useSelector((state) => state.petsInformation);

  const [petInfo, setPetInfo] = useState({
    name: petInformation?.petFlowData?.name ?? "",
    breed: petInformation?.petFlowData?.breed ?? "",
    image: petInformation?.petFlowData?.image ?? "",
  });
  const [file, setFile] = useState();
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState("");
  const [allBreeds, setAllBreeds] = useState();

  const fetchAllBreeds = () => {
    axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
      var breeds = Object.keys(res.data.message).map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      );
      breeds.push("Cat");
      setAllBreeds(breeds);
    });
  };

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setPetInfo({ ...petInfo, [name]: value });
  };

  const onClickSuggestion = (suggestion) => {
    setPetInfo({ ...petInfo, breed: suggestion });
  };
  const validate = () => {
    if (petInfo.name === "") {
      setValidationErrorMsg("Please input your pet's name.");
      setValidationError(true);
      return false;
    }

    if (petInfo.breed === "") {
      setValidationErrorMsg("Please input your pet's breed.");
      setValidationError(true);
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
        image: file,
      })
    );
    props.handleNextStep(3);
    logFbEvent("signup_start");
  };

  const fileUploadRef = createRef();

  const handleChangeImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    reader.onload = function (img) {
      fileUploadRef.current.value = "";
      const newFileName = file.name.split(".")[0] + ".jpg";
      const blob = new Blob([file], { type: "image/*,.heic" });
      heic2any({
        blob,
        toType: "image/jpg",
        quality: 0.5, // cuts the quality and size by half
      })
        .then((conversionResult) => {
          var newFile = new File([conversionResult], newFileName);
          var url = URL.createObjectURL(conversionResult);
          setPetInfo((prevState) => ({
            ...prevState,
            image: url,
          }));
          setFile(newFile);
        })
        .catch((e) => {
          setPetInfo((prevState) => ({
            ...prevState,
            image: img.target.result,
          }));
          setFile(file);
        });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Box className="pet-information-page pet-all-page">
        <Header handlePreStep={props.handlePreStep} page={1} current={2} />
        <Box className="page-padding">
          <Box my={4} className="header-text">
            <div className={classes.bold}> Pet Information </div>
            <div className="labeltext"> Let's start with the basics. </div>
          </Box>
          <Box className="upload-section">
            <div className="upload-img">
              <input
                type="file"
                className="upload-file"
                ref={fileUploadRef}
                accept="image/*,.heic"
                onChange={handleChangeImage}
              />
              {file ? (
                <img src={petInfo.image || ""} className="image-file" alt="" />
              ) : (
                <>
                  <img
                    className="camera-img"
                    src={require("@app/assets/svgs/petflow/camera.svg").default}
                    alt=""
                  />
                  <img
                    className="petleg-img"
                    src={require("@app/assets/svgs/petflow/petleg.svg").default}
                    alt=""
                  />
                </>
              )}
            </div>
          </Box>
          <div className="small-normal-label">Upload your pet's photo</div>
          <Box mt={5}>
            <div className={classes.inputLabel}> Pet's name </div>
            <Input
              className={classes.input}
              label="Pet Name"
              name="name"
              placeholder="Enter their name"
              type="text"
              value={petInfo.name}
              onChange={handleChange}
            />

            <div className={classes.inputLabel}> Breed </div>
            <Autocomplete
              value={petInfo?.breed}
              suggestions={allBreeds}
              onClick={onClickSuggestion}
              onChange={handleChange}
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
