import moment from "moment";
import React, { useRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Row } from "reactstrap";
import { temperamentIcons } from "@app/constants";
import "./style.scss";

const ProfileInformation = (props) => {
  const shortAddress = props.petInfo.pet.address
    ? `${props.petInfo.pet.address.split(",")[1]}, ${
        props.petInfo.pet.address.split(",")[2]
      }`
    : "";
  return (
    <>
      <div
        className={
          !props.isEditing
            ? "d-flex justify-content-between align-items-center"
            : " "
        }
      >
        {props.isEditing ? (
          <>
            <Row className="edit-profile-custom-row ">
              <div
                className="edit-profile-input mt-2"
                hidden={!props.isEditing}
                style={{ height: "40px", width: "45%" }}
              >
                <input
                  type="text"
                  className="form-control"
                  name="breed"
                  value={props.petInfo.pet.breed || ""}
                  onChange={props.handleInputChange}
                  readOnly={!props.isEditing}
                  style={{ paddingLeft: "10px" }}
                />
                <i className="fa fa-paw" />
              </div>
              <div
                className="edit-profile-input mt-2"
                hidden={!props.isEditing}
                style={{ height: "40px" }}
              >
                <input
                  type="date"
                  className="form-control"
                  name="age"
                  value={props.petInfo.pet.age}
                  onChange={props.handleInputChange}
                  min="2010-01-01"
                  max={moment(new Date()).format("YYYY-MM-DD")}
                />
                <i className="fa fa-history" />
              </div>
            </Row>
          </>
        ) : (
          <>
            <div
              className="edit-profile-input  mt-2"
              style={{ width: "45%" }}
              hidden={props.isEditing}
            >
              <div className="address-span address-span-breed">
                {props.petInfo.pet.breed || ""}
              </div>
              <div
                hidden={props.isEditing}
                style={{
                  width: "45%",
                  textAlign: "left",
                  marginBottom: "20px",
                  marginTop: "-10px",
                  color: "#989796",
                  font: "normal normal normal 12px/14px Roboto",
                }}
              >
                {props.birth}
              </div>
            </div>
            {props.handleShareLocation && (
              <div className="report-lost">
                <i className="fa fa-exclamation-triangle" />
                {/* <button ref={shareLocationBtn} style={{cursor: "pointer"}} onTouchStart={props.handleShareLocation} onMouseDown={props.handleShareLocation}>Report Lost</button> */}
                <button
                  className="ml-auto mr-auto notify-button"
                  onClick={props.handleShareLocation}
                >
                  <span>Report Lost</span>
                </button>
                <a
                  href={`sms:${props.smsPhoneNumber}${props.smsBody}`}
                  className="d-none"
                  ref={props.shareLocationBtn}
                >
                  Report Lost
                </a>
              </div>
            )}
          </>
        )}
      </div>
      <Row className="edit-profile-custom-row">
        <div className="edit-profile-input" style={{ height: "40px" }}>
          <input
            type="text"
            className="form-control"
            value={props.petInfo.pet.gender || ""}
            hidden={props.isEditing}
            readOnly
          />
          <i className="fa fa-transgender" hidden={props.isEditing} />
          <select
            name="gender"
            value={props.petInfo.pet.gender || ""}
            hidden={!props.isEditing}
            onChange={props.handleInputChange}
            className="edit-profile-select"
          >
            <option className="text-center" value="Male">
              Male
            </option>
            <option className="text-center" value="Female">
              Female
            </option>
          </select>
        </div>
        <div className="edit-profile-input" hidden={props.isEditing}>
          <div className="address-span">
            {props.petInfo.pet.weight || "0"} lbs
          </div>
          <i className="fa fa-weight-hanging" />
        </div>
        <div
          className="edit-profile-input"
          style={{ height: "40px" }}
          hidden={!props.isEditing}
        >
          <input
            type="number"
            className="form-control"
            name="weight"
            value={props.petInfo.pet.weight || ""}
            onChange={props.handleInputChange}
          />
          <i className="fa fa-weight-hanging" />
        </div>
        {Object.keys(props.temperamentArr).map(function (keyName, keyIndex) {
          return (
            props.petInfo.pet.temperament &&
            props.petInfo.pet.temperament[keyIndex] === "1" &&
            (keyName !== "playful" ? (
              <div className="edit-profile-input" key={Math.random() * Math.PI}>
                <input
                  type="text"
                  name={keyName}
                  className="form-control"
                  value={props.temperamentArr[keyName]}
                  onClick={() => {
                    if (props.isEditing)
                      props.setTemperamentModal(!props.temperamentModal);
                  }}
                  readOnly={true}
                />
                <i className={`fa ${temperamentIcons[keyIndex]}`} />
              </div>
            ) : (
              <div
                className="edit-profile-input astrology form-control"
                key={Math.random() * Math.PI}
              >
                <img
                  src={require("@app/assets/svgs/yarn.svg").default}
                  width="18px"
                  height="18px"
                  alt=""
                />
                <input
                  type="text"
                  className="form-control"
                  style={{
                    border: "none",
                    padding: "0",
                    height: "auto",
                  }}
                  value={"Playful"}
                  onClick={() => {
                    if (props.isEditing)
                      props.setTemperamentModal(!props.temperamentModal);
                  }}
                  readOnly={true}
                />
              </div>
            ))
          );
        })}
        {((props.petInfo.pet.medicalCondition !== null &&
          props.petInfo.pet.medicalCondition !== "") ||
          props.isEditing) && (
          <div className="edit-profile-input" style={{ height: "40px" }}>
            <input
              type="text"
              className="form-control"
              name="medicalCondition"
              value={props.petInfo.pet.medicalCondition}
              onChange={props.handleInputChange}
              readOnly={!props.isEditing}
            />
            <i className="fa fa-wheelchair" />
          </div>
        )}
        <div className="edit-profile-input" style={{ height: "40px" }}>
          <input
            type="text"
            className="form-control"
            value={
              props.petInfo.pet.neutered === 0
                ? props.petInfo.pet.gender === "Male"
                  ? "Not Neutered"
                  : "Not Spayed"
                : props.petInfo.pet.gender === "Male"
                ? "Neutered"
                : "Spayed"
            }
            hidden={props.isEditing}
            readOnly
          />
          <i className="fa fa-heart-broken" hidden={props.isEditing} />
          <select
            name="neutered"
            value={`${props.petInfo.pet.neutered}` || 1}
            hidden={!props.isEditing}
            onChange={props.handleInputChange}
            className="edit-profile-select"
          >
            <option className="text-center" value="1">
              {props.petInfo.pet.gender === "Male" ? "Neutered" : "Spayed"}
            </option>
            <option className="text-center" value="0">
              {props.petInfo.pet.gender === "Male"
                ? "Not Neutered"
                : "Not Spayed"}
            </option>
          </select>
        </div>
        <div
          className="edit-profile-input astrology form-control"
          style={{ height: "40px" }}
        >
          <img src={props?.astrology?.url} width="18px" height="18px" alt="" />
          <span>{props?.astrology?.name}</span>
        </div>
      </Row>
      <Row>
        <div
          className="edit-profile-input"
          style={{ height: "40px", width: "100%" }}
          hidden={props.isEditing}
        >
          <div className="address-span">
            {props.petInfo.pet.is_address_hidden
              ? shortAddress
              : props.petInfo.pet.address || ""}
          </div>
          <i className="fa fa-map-marker-alt" />
        </div>
        <div
          className="edit-profile-input"
          style={{ height: "50px", width: "100%" }}
          hidden={!props.isEditing}
        >
          <GooglePlacesAutocomplete
            selectProps={{
              isClearable: true,
              placeholder: props.petInfo.pet.address,
              value: props.petInfo.pet.address,
              onChange: (obj) => {
                props.setPetInfo((prevState) => ({
                  ...prevState,
                  pet: {
                    ...prevState.pet,
                    address: obj && obj.label ? obj.label : "",
                  },
                }));
              },
              styles: {
                input: (provided) => ({
                  ...provided,
                  height: 40,
                  paddingLeft: 20,
                  whiteSpace: "normal",
                }),
                option: (provided) => ({
                  ...provided,
                  fontWeight: 400,
                }),
                singleValue: (provided) => {
                  return {
                    ...provided,
                    paddingLeft: 20,
                    whiteSpace: "normal",
                    fontWeight: 400,
                  };
                },
                placeholder: (provided) => ({
                  ...provided,
                  paddingLeft: 20,
                  fontWeight: 400,
                }),
              },
            }}
          />
        </div>
      </Row>
    </>
  );
};

export default ProfileInformation;
