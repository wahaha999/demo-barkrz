import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FriendlyHuman = (props) => {
  const OnOwnerNameChange = (e) => {
    const { name, value } = e.target;
    let arr = props.petInfo.owners;
    arr[name]["owner"].name = value;
    props.setPetInfo((prevState) => ({ ...prevState, owners: arr }));
  };

  const OnDeletePhone = (i, j) => {
    let arr = props.petInfo.owners;
    if (arr[i].phone_numbers[j].id) {
      arr[i].phone_numbers[j] = { ...arr[i].phone_numbers[j], deleted: true };
      props.setPetInfo((prevState) => ({ ...prevState, owners: arr }));
    } else {
      let filteredArray = arr[i].phone_numbers.filter((item, index) => {
        return index !== j;
      });

      arr[i].phone_numbers = filteredArray;
      props.setPetInfo((prevState) => ({ ...prevState, owners: arr }));
    }
  };

  const OnAddPhone = (index) => {
    let arr = props.petInfo.owners;
    arr[index].phone_numbers.push({ phone_number: "" });
    props.setPetInfo((prevState) => ({ ...prevState, owners: arr }));
  };

  const OnAddOwner = () => {
    let arr = props.petInfo.owners;
    arr.push({ owner: { name: "" }, phone_numbers: [{ phone_number: "" }] });
    props.setPetInfo((prevState) => ({ ...prevState, owners: arr }));
  };

  return (
    <>
      <p className="font-weight-bold" style={{ fontSize: "22px" }}>
        Friendly Humans
      </p>
      <p style={{ fontSize: "16px" }}>Owner Contact Information</p>
      {props.petInfo.owners.map((ownerObj, i) => {
        return (
          !ownerObj.owner.deleted && (
            <div className="edit-owner-custom-row" key={`owner-${ownerObj.owner.id}`}>
              <div className="edit-owner-input">
                <input
                  type="text"
                  className="form-control"
                  name={i}
                  value={ownerObj.owner.name}
                  onChange={OnOwnerNameChange}
                  readOnly={!props.isEditing}
                />
                <i className="fa fa-male" />
              </div>
              {ownerObj.phone_numbers.map((phoneObj, j) => {
                return (
                  !phoneObj.deleted && (
                    <div
                      key={["name", i, "phone", j].join("_")}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                      className="mt-2"
                    >
                      <PhoneInput
                        country={"us"}
                        value={phoneObj.phone_number}
                        inputProps={{
                          name: i + "," + j,
                          readOnly: !props.isEditing,
                        }}
                        disableDropdown={!props.isEditing}
                        onChange={(value, data, event, formattedValue) => {
                          let arr = props.petInfo.owners;
                          arr[i]["phone_numbers"][j].phone_number =
                            formattedValue;
                          props.setPetInfo((prevState) => ({
                            ...prevState,
                            owners: arr,
                          }));
                        }}
                      />
                      <i
                        className="fa fa-plus-circle edit_profile_phone_number_plus_i"
                        hidden={!props.isEditing}
                        onClick={() => {
                          OnAddPhone(i);
                        }}
                      />
                      <i
                        className="fa fa-times edit_profile_phone_number_plus_i"
                        hidden={!props.isEditing}
                        onClick={() => {
                          OnDeletePhone(i, j);
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  )
                );
              })}
            </div>
          )
        );
      })}
      <div className="text-center mt-4" hidden={!props.isEditing}>
        <button onClick={OnAddOwner} className="profile-plus-btn">
          <img
            src={require("@app/assets/img/plus-btn.png").default}
            width="30px"
            height="30px"
            alt=""
          />
        </button>
      </div>
    </>
  );
};

export default FriendlyHuman;
