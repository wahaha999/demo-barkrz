import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "@app/views/components/Loading";
import heic2any from "heic2any";
import { PetUpdate, PetDelete } from "@app/actions/pet";
import { Container, Row, Col, Modal } from "reactstrap";
import Alert from "@app/views/components/Alert";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import queryString from "query-string";
import { getAstrology, getAge } from "@src/utils/date";
import { temperamentArr } from "@app/constants";

import "@src/utils/prototypes";
import "./style.scss";
import FriendlyHuman from "@app/views/components/FriendlyHuman";
import ProfileInformation from "@app/views/components/ProfileInformation/Index";
import ProfileAvtar from "@app/views/components/ProfileAvtar/Index";

const EditProfilePage = (props) => {
  let url = props.location.search;
  let params = queryString.parse(url);
  const { id } = params;

  const [inProgress, setInProgress] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelDlg, setIsDelDlg] = useState(false);
  const [uploadingError, setUploadingError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const originalPetArr = useSelector((state) => state.petsInformation.Pets);
  const [petInfo, setPetInfo] = useState({
    pet: {
      id: null,
      identity_code: null,
      gender: null,
      temperament: null,
      name: null,
      address: null,
      image: null,
      breed: null,
      age: null,
      weight: null,
      neutered: "1",
      medicalCondition: null,
      notes: null,
      microchip_number: null,
    },
    owners: [],
  });
  const [birth, setBirth] = useState("");
  const [astrology, setAstrology] = useState({ name: "Aries", url: "" });
  const [temperamentModal, setTemperamentModal] = useState(false);
  const [textareaheight, setTextareaheight] = useState(1);

  const textArea = useRef();
  let history = useHistory();
  const dispatch = useDispatch();

  const handleChange = () => {
    const height = textArea.current.scrollHeight;
    const rowHeight = 18;
    const trows = Math.ceil(height / rowHeight) - 1;

    if (trows) {
      setTextareaheight(trows);
    }
  };

  const handleTemperamentChange = (e, index) => {
    const { checked } = e.target;
    let replacement = "0";
    if (checked) {
      replacement = "1";
    }
    setPetInfo((prevState) => ({
      ...prevState,
      pet: {
        ...prevState.pet,
        temperament: petInfo.pet.temperament.replaceAt(index, replacement),
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prevState) => ({
      ...prevState,
      pet: { ...prevState.pet, [name]: value },
    }));
  };

  const OnEnableEditing = () => {
    setIsEditing(true);
    setBirth(petInfo.pet.age);
  };

  const OnSaveEditing = () => {
    setIsEditing(false);

    setBirth(getAge(petInfo.pet.age));
    setAstrology(getAstrology(petInfo.pet.age));
    SaveChange();
  };

  const OnHandleFileChange = (dataUri, file) => {
    const newFileName = file.name.split(".")[0] + ".jpg";
    const blob = new Blob([file], { type: "image/*,.heic" });
    setInProgress(true);
    heic2any({
      blob,
      toType: "image/jpeg",
      quality: 0.5, // cuts the quality and size by half
    })
      .then((conversionResult) => {
        setInProgress(false);
        var newFile = new File([conversionResult], newFileName);
        var url = URL.createObjectURL(conversionResult);
        setPetInfo((prevState) => ({
          ...prevState,
          pet: { ...prevState.pet, image: url },
        }));
        setFile(newFile);
      })
      .catch((e) => {
        setInProgress(false);
        setPetInfo((prevState) => ({
          ...prevState,
          pet: { ...prevState.pet, image: dataUri },
        }));
        setFile(file);
      });
  };

  const OnDeletePet = () => {
    setIsDelDlg(false);
    setInProgress(true);

    dispatch(
      PetDelete({ id: petInfo.pet.id }, (option, message) => {
        setInProgress(false);
        if (option) {
          history.push("/petsList");
        } else {
          setUploadingError(true);
          setSuccess(option);
          setMessage(message);
        }
      })
    );
  };

  const SaveChange = () => {
    let year = new Date().getFullYear();
    if (
      parseInt(petInfo.pet.age.substr(0, 4)) < 1980 ||
      parseInt(petInfo.pet.age.substr(0, 4)) > year
    ) {
      setUploadingError(true);
      setMessage("Please Input Correct Birth Year");
      setSuccess(false);
      return;
    }
    let data = {
      id: petInfo.pet.id,
      name: petInfo.pet.name,
      gender: petInfo.pet.gender,
      address: petInfo.pet.address,
      breed: petInfo.pet.breed,
      age: petInfo.pet.age,
      weight: petInfo.pet.weight,
      neutered: petInfo.pet.neutered,
      medicalCondition: petInfo.pet.medicalCondition,
      temperament: petInfo.pet.temperament,
      ownerNames: petInfo.owners.filter((item) => item.owner.name !== ""),
      notes: petInfo.pet.notes,
      microchip_number: "",
    };
    // Update the formData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(data));
    setInProgress(true);
    dispatch(PetUpdate(formData, SaveChangeCallback));
  };

  const SaveChangeCallback = (option, message) => {
    setInProgress(false);
    setUploadingError(true);
    setSuccess(option);
    setMessage(message);
  };

  const OnAfterCallbackAlert = () => {
    setUploadingError(false);
  };

  const DiscardChange = () => {
    setIsEditing(false);
    setPetInfo(originalPetArr[id]);
    setBirth(getAge(originalPetArr[id].pet.age));
  };

  useEffect(() => {
    if (id === undefined || id === "") history.push("/");
    else if (originalPetArr.length > 0) {
      setPetInfo(originalPetArr[id]);
      setBirth(getAge(originalPetArr[id].pet.age));
      setAstrology(getAstrology(originalPetArr[id].pet.age));
    }
    // eslint-disable-next-line
  }, [originalPetArr, id]);

  useEffect(() => {
    handleChange();
  }, [petInfo]);

  return (
    <>
      <MobileNavbar />
      <Container style={{ padding: "0 5px 0 0" }}>
        <Row>
          <Col
            className="mr-auto ml-auto"
            lg="5"
            md="6"
            xs="12"
            style={{ display: "inline-flex", padding: "0", height: "100%" }}
          >
            {/* <div style={{ width: "19%", height: "100%" }}>
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
            </div> */}
            <div
              style={{
                width: "100%",
                padding: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: "100px",
                  marginLeft: "30px",
                }}
              >
                <div className="edit-avatar-photo">
                  {isEditing ? (
                    <ImageUpload handlefilechange={OnHandleFileChange} />
                  ) : (
                    <></>
                  )}
                  <img src={petInfo.pet.image || ""} alt="" />
                  <i className="fa fa-camera" hidden={!isEditing} />
                </div>
                <div className="edit-profile-custom-name">
                  <ProfileAvtar
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                    petInfo={petInfo}
                  />
                </div>
              </div>
              <div className={`profile-card ${isEditing ? "pt-3" : ""} mt-5`}>
                <div className="trash-icon mb-3">
                  <span
                    style={{
                      fontSize: "16px",
                      textAlign: "right",
                      color: "gray",
                    }}
                  >
                    {!isEditing ? (
                      <span>
                        {!petInfo.pet.identity_code && (
                          <span
                            style={{
                              fontSize: "14px",
                              textAlign: "right",
                              marginRight: "5px",
                              color: "red",
                            }}
                            className="font-weight-bold"
                            onClick={() =>
                              props.history.push(
                                `/update-pet-id?id=${petInfo.pet.id}`
                              )
                            }
                          >
                            Connect ID{" "}
                          </span>
                        )}
                        <span
                          style={{ fontSize: "14px", textAlign: "right" }}
                          className="font-weight-bold"
                          onClick={OnEnableEditing}
                        >
                          Edit
                        </span>
                      </span>
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: "14px",
                            textAlign: "right",
                            marginRight: "5px",
                          }}
                          className="font-weight-bold"
                          onClick={OnSaveEditing}
                        >
                          {" "}
                          Save{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            textAlign: "right",
                            marginRight: "5px",
                            marginLeft: "5px",
                          }}
                          className="font-weight-bold"
                          onClick={DiscardChange}
                        >
                          {" "}
                          Cancel{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            textAlign: "right",
                            color: "red",
                            marginLeft: "5px",
                          }}
                          className="font-weight-bold"
                          onClick={() => {
                            setIsDelDlg(true);
                          }}
                        >
                          {" "}
                          Delete Pet{" "}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <ProfileInformation
                  handleInputChange={handleInputChange}
                  temperamentArr={temperamentArr}
                  birth={birth}
                  setTemperamentModal={setTemperamentModal}
                  temperamentModal={temperamentModal}
                  astrology={astrology}
                  setPetInfo={setPetInfo}
                  petInfo={petInfo}
                  isEditing={isEditing}
                />
              </div>
              <div className={`profile-card ${isEditing ? "pt-3" : ""}`}>
                <div className="edit-profile-input notes">
                  <textarea
                    placeholder="Notes:"
                    className="form-control"
                    name="notes"
                    value={petInfo.pet.notes || ""}
                    ref={textArea}
                    rows={4}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
              <div
                className={`profile-card ${isEditing ? "pt-3" : ""}`}
                style={{ height: "400px", overflowY: "scroll" }}
              >
                <FriendlyHuman
                  petInfo={petInfo}
                  isEditing={isEditing}
                  setPetInfo={setPetInfo}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="save-contents-dialog-background" hidden={!isDelDlg}>
        <div className="save-contents-dialog">
          <div>
            Are you sure you want to delete this Barkrz profile? <br />
            <span>You cannot undo this action.</span>
          </div>
          <button onClick={OnDeletePet}>Yes</button>
          <button
            onClick={() => {
              setIsDelDlg(false);
            }}
          >
            No
          </button>
        </div>
      </div>
      {inProgress && <Loading />}
      {uploadingError && (
        <Alert
          message={message}
          OnClose={OnAfterCallbackAlert}
          success={success}
        />
      )}
      <Modal
        isOpen={temperamentModal}
        toggle={() => {
          if (isEditing) setTemperamentModal(!temperamentModal);
        }}
      >
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            type="button"
            onClick={() => {
              if (isEditing) setTemperamentModal(!temperamentModal);
            }}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h5 className="modal-title text-center" id="exampleModalLabel">
            Temperament
          </h5>
        </div>
        <Row className="p-3 text-center">
          {Object.keys(temperamentArr).map(function (keyName, keyIndex) {
            return (
              <Col md={6} xs={6} key={keyIndex}>
                <label className="custom-check-box">
                  {temperamentArr[keyName]}
                  <input
                    name={keyName}
                    checked={
                      petInfo.pet.temperament &&
                      petInfo.pet.temperament[keyIndex] === "1"
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
      </Modal>
    </>
  );
};

const ImageUpload = (props) => {
  const fileUploadRef = React.createRef();

  const handleFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (!file) return;

    reader.onload = function (img) {
      fileUploadRef.current.value = "";
      props.handlefilechange(img.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <input
      ref={fileUploadRef}
      type="file"
      accept="image/*,.heic"
      onChange={handleFile}
    />
  );
};

export default EditProfilePage;
