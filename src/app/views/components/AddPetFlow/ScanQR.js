import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./petflow.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { PetUpdate, Pet_Flow_Information } from "@app/actions/pet";
import axios from "axios";
import Swal from "sweetalert2";
import QrReader from "react-qr-reader";
import { API_URL } from "@app/constants";
import { useHistory } from "react-router-dom";

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

export const ScanQR = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const information = useSelector((state) => state);
  const petInformation = useSelector((state) => state.petsInformation);

  const [petInfo, setPetInfo] = useState({
    identity_code: petInformation?.petFlowData?.identity_code ?? "",
  });
  const [scan, setScan] = useState({ scan_success: false, errorMsg: "" });

  useEffect(() => {
    const params = localStorage.getItem("profile-params");
    if (params) {
      handleScan(`https://barkrz.com/a?p=${params}`);
      localStorage.removeItem("profile-params");
    }
  }, []);

  const handleNext = (code) => {
    if (props.petID) {
      updateIDCode(code);
    } else {
      props.handleNextStep(2);
    }
  };

  const updateIDCode = (code) => {
    let data = {
      id: props.petID,
      identity_code: code,
    };
    // Update the formData object
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    dispatch(PetUpdate(formData, SaveChangeCallback));
  };

  const SaveChangeCallback = (option, message) => {
    history.push("/petsList");
  };

  const getCodefromURL = (url) => {
    let res = url.match(/[^=]+$/gi);
    if (res) {
      return res[0];
    } else {
      return null;
    }
  };

  const handleScan = (url) => {
    let token = information?.auth?.userdata.token;
    const header = { headers: { Authorization: `Bearer ${token}` } };
    if (scan.scan_success === true) {
      return;
    }
    if (url) {
      let urlCheck = /barkrz.com/;
      if (urlCheck.test(url)) {
        if (getCodefromURL(url)) {
          let code = getCodefromURL(url);
          let data = {
            identity_code: code,
          };
          if (code) {
            dispatch(Pet_Flow_Information({ ...petInfo, identity_code: code }));
            setPetInfo({ identity_code: code });
          }
          axios
            .post(`${API_URL}checkCode`, data, header)
            .then((res) => {
              if (!res.data.existance) {
                Swal.fire({
                  text: "Success!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1200,
                }).then(() => {
                  handleNext(code);
                });
              } else {
                Swal.fire({
                  text: "Code already exists.",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 3000,
                }).then(() => {
                  setScan({ scan_success: false });
                });
              }
            })
            .catch((err) => {
              setScan({
                errorMsg: err.message,
                scan_success: false,
              });
              Swal.fire({
                text: "Network Error",
                icon: "error",
                showConfirmButton: false,
                timer: 3000,
              });
            });
        } else {
          Swal.fire({
            text: "Invalid tag Scanned",
            icon: "warning",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            setScan({ scan_success: false });
          });
        }
      } else {
        Swal.fire({
          text: "Invalid tag Scanned",
          icon: "warning",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          setScan({ scan_success: false });
        });
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    Swal.fire({
      text: "Webcam not supported.",
      icon: "warning",
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      //   this.props.history.push("/");
    });
  };

  return (
    <>
      <Header handlePreStep={props.handlePreStep} page={1} current={1} />
      <Box className="page-padding">
        <Box my={4} className="header-text">
          <div className={classes.bold} style={{ textAlign: "center" }}>
            {" "}
            Scan Your BarkrZ Pet ID{" "}
          </div>
        </Box>
        <div>
          <QrReader onDelay={200} onError={handleError} onScan={handleScan} />
        </div>
        {!props.petID && (
          <div style={{ textAlign: "center" }}>
            <Button className="next-button" onClick={handleNext}>
              skip
            </Button>
          </div>
        )}
      </Box>
    </>
  );
};
