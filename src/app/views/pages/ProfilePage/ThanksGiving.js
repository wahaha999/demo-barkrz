import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { OnRegisterPetIdCode } from "@app/actions/regsiterPet";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import Alert from "@app/views/components/Alert";
import { API_URL } from "@app/constants.js";
import "./style.scss";
import queryString from "query-string";
import axios from "axios";
import { getAstrology, getAge } from "@src/utils/date";
import Loading from "@app/views/components/Loading";
import ProgressiveImage from "react-progressive-image-loading";
import { temperamentArr } from "@app/constants";
import FriendlyHuman from "@app/views/components/FriendlyHuman";
import ProfileAvtar from "@app/views/components/ProfileAvtar/Index";
import ProfileInformation from "@app/views/components/ProfileInformation/Index";

const ThanksGiving = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [birth, setBirth] = useState("");
  const [astrology, setAstrology] = useState({ name: "Aries", url: "" });
  const [error, setError] = useState(false);
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
    },
    owners: [],
  });

  let history = useHistory();
  const dispatch = useDispatch();

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
  }, [petInfo]);

  const checkLocationPermission = () => {
    let url = props.location.search;
    let params = queryString.parse(url);
    const { p, admin } = params;
    if (!admin) {
      profileScan(`code=${p}`);
    }
  };

  const profileScan = (params) => {
    axios.get(`${API_URL}profile_scan?${params}`).then((res) => {
      console.log(res);
    });
  };

  const sendProfileVisit = (params, p) => {
    axios
      .get(`${API_URL}profile?${params}`)
      .then((res) => {
        setLoaded(true);
        if (res.data.error) {
          setError(true);
          setMessage(res.data.error);
          // if (!res.data.created) {
          //     dispatch(OnRegisterPetIdCode({ identity_code: p }));
          //     Swal.fire({
          //         text: '',
          //         icon: 'success',
          //         showConfirmButton: false,
          //         timer: 2000,
          //     }).then((result) => {
          //         history.push("/gene");
          //     })
          // }
        } else {
          setPetInfo(res.data);
          checkLocationPermission();
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <MobileNavbar startColor="#F6B444" endColor="#F3772F" />
      <Container style={{ display: "flex", padding: "0 5px 0 0" }}>
        <Row>
          <Col
            className="mr-auto ml-auto"
            lg="5"
            md="6"
            xs="12"
            style={{ display: "inline-flex", padding: "0" }}
          >
            <div style={{ width: "15%", display: "flex" }}>
              <img
                style={{ width: "90%" }}
                src={require("@app/assets/img/pumpkin_side.png").default}
                alt=""
              />            
            </div>
            <div style={{ width: "85%", padding: "10px" }}>
              <div style={{ display: "flex", marginTop: "150px" }}>
                <div className="profile-avatar-photo">
                  {petInfo.pet.image !== "" && (
                    <ProgressiveImage
                      preview={
                        require("@app/assets/img/blurred-image-1.jpg").default
                      }
                      src={petInfo.pet.image}
                      render={(src, style) => (
                        <img src={src} style={style} alt="" />
                      )}
                    />
                  )}
                </div>
                <div className="profile-custom-name">
                  <ProfileAvtar isEditing={false} petInfo={petInfo} />
                </div>
              </div>
              <div className="profile-card mt-5">
                <ProfileInformation
                  temperamentArr={temperamentArr}
                  birth={birth}
                  astrology={astrology}
                  setPetInfo={setPetInfo}
                  petInfo={petInfo}
                  isEditing={false}
                />
              </div>
              <div className="profile-card">
                <div className="edit-profile-input notes">
                  <textarea
                    placeholder="Notes:"
                    className="form-control"
                    name="notes"
                    value={petInfo.pet.notes || ""}
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
              <img
                style={{
                  position: "absolute",
                  left: 0,
                  top: "60px",
                  zIndex: 10,
                }}
                src={require("@app/assets/svgs/spider.svg").default}
                alt=""
              />
              <img
                style={{
                  position: "absolute",
                  right: 0,
                  top: "60px",
                  zIndex: 10,
                }}
                src={require("@app/assets/svgs/bat.svg").default}
                alt=""
              />
              <div className="text-right mt-5">
                <img
                  style={{}}
                  src={require("@app/assets/svgs/pumpkin.svg").default}
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {error && (
        <Alert
          message={message}
          OnClose={() => {
            setError(false);
            history.push("/auth");
          }}
          success={false}
        />
      )}
      {!loaded && <Loading />}
    </>
  );
};

export default ThanksGiving;
