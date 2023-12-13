import React from "react";

const ProfileAvtar = (props) => {
  return (
    <>
      <span
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          marginLeft: "10px",
          marginBottom: "10px",
        }}
      >
        Hi, it's me...
      </span>
      <input
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "right",
          color: "#dddddd",
          border: "none",
          width: "150px",
          marginLeft: "auto",
          marginTop: "-10px",
        }}
        value={props.petInfo.pet.name || ""}
        name="name"
        onChange={props?.handleInputChange}
        hidden={!props.isEditing}
      />
      <span
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          textAlign: "right",
          color: "#89CAB6",
          border: "none",
          width: "150px",
          marginLeft: "auto",
          marginTop: "-10px",
        }}
        hidden={props.isEditing}
      >
        {props?.petInfo?.pet.name || ""}{" "}
      </span>
      <div style={{ height: "1px", backgroundColor: "#89CAB6" }} />
    </>
  );
};
export default ProfileAvtar;
