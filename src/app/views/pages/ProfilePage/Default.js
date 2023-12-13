import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "@app/constants.js";
import { Container, Row, Col } from "reactstrap";
import { getAstrology, getAge } from "@src/utils/date";
import { temperamentArr } from "@app/constants";
import { useJsApiLoader } from "@react-google-maps/api";
import { logFbEvent } from "@src/firebase.js";
import axios from "axios";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import Alert from "@app/views/components/Alert";
import AlertForNoExist from "@app/views/components/AlertForNoExist";
import queryString from "query-string";
import Loading from "@app/views/components/Loading";
import "./style.scss";
import FriendlyHuman from "@app/views/components/FriendlyHuman";
import ProfileInformation from "@app/views/components/ProfileInformation/Index";
import ProfileAvtar from "@app/views/components/ProfileAvtar/Index";

const Default = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [loadLocation, setLoadLocation] = useState(false);
  const [message, setMessage] = useState("");
  const [birth, setBirth] = useState("");
  const [astrology, setAstrology] = useState({ name: "Aries", url: "" });
  const [error, setError] = useState(false);
  const [profileError, setProfileError] = useState(false);
  const [smsPhoneNumber, setSmsPhoneNumber] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [textareaheight, setTextareaheight] = useState(1);
  const [petInfo, setPetInfo] = useState({
    pet: {
      id: null,
      gender: null,
      temperament: null,
      name: null,
      address: null,
      image: "",
      breed: null,
      age: null,
      weight: "0",
      neutered: "1",
      medicalCondition: null,
      notes: null,
      is_address_hidden: false,
    },
    owners: [],
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
  });

  const shareLocationBtn = useRef();
  const textArea = useRef();
  let history = useHistory();

  const handleChange = () => {
    const height = textArea.current.scrollHeight;
    const rowHeight = 18;
    const trows = Math.ceil(height / rowHeight) - 1;

    if (trows) {
      setTextareaheight(trows);
    }
  };

  useEffect(() => {
    let url = props.location.search;
    let params = queryString.parse(url);
    const { p } = params;
    if (p === undefined || p === "") history.push("/");
    else {
      var newParams = `code=${p}`;
      sendProfileVisit(newParams, p);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (petInfo.pet.age) {
      setBirth(getAge(petInfo.pet.age));
      setAstrology(getAstrology(petInfo.pet.age));
    }

    if (petInfo.owners.length !== 0)
      setSmsPhoneNumber(
        petInfo.owners[0].phone_numbers[0].phone_number?.replace(/[^0-9]/g, "")
      );

    handleChange();
  }, [petInfo]);

  const checkLocationPermission = () => {
    let url = props.location.search;
    let params = queryString.parse(url);
    const { p, admin } = params;
    var newParams = "";

    if (navigator.geolocation) {
      if (!navigator.permissions) {
        navigator.geolocation.getCurrentPosition(
          LocationFoundSuccess,
          errors,
          options
        );
      } else {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (!admin) {
              if (result.state === "granted") {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(function (position) {
                  const { latitude, longitude } = position.coords;
                  newParams = `code=${p}&lat=${latitude}&lng=${longitude}`;
                  profileScan(newParams);
                });
              } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(function (position) {
                  console.log(position);
                  const { latitude, longitude } = position.coords;
                  newParams = `code=${p}&lat=${latitude}&lng=${longitude}`;
                  profileScan(newParams);
                });
              } else if (!admin) {
                profileScan(`code=${p}`);
              }
            }
            result.onchange = function () {
              if (result.state === "granted" && !admin) {
                //If granted then you can directly call your function here
                navigator.geolocation.getCurrentPosition(function (position) {
                  const { latitude, longitude } = position.coords;
                  newParams = `code=${p}&lat=${latitude}&lng=${longitude}`;
                  profileScan(newParams);
                });
              } else if (!admin) {
                profileScan(`code=${p}`);
              }
            };
          });
      }
    } else if (!admin) {
      profileScan(`code=${p}`);
    }
  };

  const options = {
    enableHighAccuracy: true,
  };

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    getReverseGeocodingData(latitude, longitude);
    setLoadLocation(false);
  };

  const LocationFoundSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    let url = props.location.search;
    let params = queryString.parse(url);
    const { p, admin } = params;

    if (!admin) {
      const newParams = `code=${p}&lat=${latitude}&lng=${longitude}`;
      profileScan(newParams);
    }
  };

  const errors = (err) => {
    setError(true);
    setMessage(err.message);
    setLoadLocation(false);
  };

  const handleShareLocation = () => {
    setLoadLocation(true);

    if (isLoaded) {
      if (navigator.geolocation) {
        if (navigator.permissions) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              if (result.state === "granted") {
                console.log(result.state);
                navigator.geolocation.getCurrentPosition(success);
              } else if (result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(
                  success,
                  errors,
                  options
                );
              } else if (result.state === "denied") {
                setLoadLocation(false);
                setError(true);
                setMessage(
                  "Your browser has geolocation turned off. Please enable it in your settings."
                );
              }

              result.onchange = function () {
                console.log(result.state);
                if (result.state === "granted") {
                  navigator.geolocation.getCurrentPosition(success);
                }
              };
            });
        } else {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        }
      } else {
        setLoadLocation(false);
        setError(true);
        setMessage(
          "Your browser has geolocation turned off. Please enable it in your settings."
        );
      }
    } else {
      alert("Google map api was not loaded. please refresh page and try again");
      window.location.reload();
    }
  };

  const getReverseGeocodingData = (lat, lng) => {
    var latlng = new window.google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ latLng: latlng }, (results, status) => {
      if (status !== window.google.maps.GeocoderStatus.OK) {
        alert(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status === window.google.maps.GeocoderStatus.OK) {
        const address = results[0].formatted_address;
        const iOS =
          !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

        const sep = iOS ? "&" : "?";

        setSmsBody(
          `${sep}body=I have found your pet ${petInfo.pet.name} using BarkrZ. Here is my tagged location ${address}`
        );
        shareLocationBtn.current.click();
      }
    });
  };

  const profileScan = (params) => {
    axios.get(`${API_URL}profile_scan?${params}`).then((res) => {
      console.log(res);
    });
  };

  const sendProfileVisit = (params, p) => {
    logFbEvent("profile_scanned", p);
    axios
      .get(`${API_URL}profile?${params}`)
      .then((res) => {
        setLoaded(true);
        if (res.data.error) {
          setError(true);
          setProfileError(true);

          //save params to localstorage here before go to auth..
          //

          history.push(`/auth?${params}`);
          const code = new URLSearchParams(params).get("code");
          localStorage.setItem("profile-params", code ? code : "");
        } else {
          setPetInfo(res.data);
          checkLocationPermission();
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <MobileNavbar />
      <Container style={{ display: "flex", padding: "0 5px 0 0" }}>
        <Row>
          <Col
            className="mr-auto ml-auto"
            lg="5"
            md="6"
            xs="12"
            style={{ display: "inline-flex", padding: "0", height: "100%" }}
          >
            <div style={{ width: "15%", height: "100%" }}>
              <img
                src={require("@app/assets/svgs/lateral_bar_svg-01.svg").default}
                alt="left bar"
                style={{
                  height: "100%",
                  bottom: 0,
                  verticalAlign: "bottom",
                  left: 0,
                }}
              />
            </div>
            <div style={{ width: "85%", padding: "10px" }}>
              <div style={{ display: "flex", marginTop: "100px" }}>
                <div className="profile-avatar-photo">
                  <img
                    src={
                      petInfo.pet.image !== ""
                        ? petInfo.pet.image.replace("http:", "https:")
                        : require("@app/assets/img/tolee.png").default
                    }
                    alt="img"
                  />
                </div>
                <div className="profile-custom-name">
                  <ProfileAvtar isEditing={false} petInfo={petInfo} />
                </div>
              </div>
              <div className="profile-card mt-4">
                <ProfileInformation
                  smsPhoneNumber={smsPhoneNumber}
                  smsBody={smsBody}
                  temperamentArr={temperamentArr}
                  birth={birth}
                  astrology={astrology}
                  setPetInfo={setPetInfo}
                  petInfo={petInfo}
                  isEditing={false}
                  handleShareLocation={handleShareLocation}
                  shareLocationBtn={shareLocationBtn}
                />
              </div>
              <div className="profile-card">
                <div className="edit-profile-input notes">
                  <textarea
                    placeholder="Notes:"
                    className="form-control"
                    name="notes"
                    value={petInfo.pet.notes || ""}
                    ref={textArea}
                    rows={textareaheight}
                    readOnly
                  />
                </div>
              </div>
              <div className="profile-card">
                <FriendlyHuman
                  petInfo={petInfo}
                  isEditing={false}
                  setPetInfo={setPetInfo}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {error &&
        (profileError ? (
          <AlertForNoExist
            message={message}
            OnClose={() => {
              setError(false);
              setProfileError(false);
              history.push("/auth");
            }}
            success={true}
          />
        ) : (
          <Alert
            message={message}
            OnClose={() => {
              setError(false);
            }}
            success={false}
          />
        ))}
      {!loaded && <Loading />}
    </>
  );
};

export default Default;
