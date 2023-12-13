import React, { Component } from "react";

class CustomInput extends Component {
  render() {
    const { label, type, icon, ...rest } = this.props;
    return (
      <>
        <div
          style={{ textAlign: "left", color: "white" }}
          className="mt-2 mb-2 register-input"
        >
          <label>{label}</label>
          <div className="custom-input pet-breed-input">
            <input type={type} className="form-control" {...rest} />
            <span>
              <i style={{ fontSize: "18px" }} className={icon}></i>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default CustomInput;
