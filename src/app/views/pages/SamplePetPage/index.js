import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDom from "react-dom";
import Loading from "@app/views/components/Loading";
import { PetUpdate } from "@app/actions/pet";
import { Container, Row, Col, Modal } from "reactstrap";
import Alert from "@app/views/components/Alert";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// import 'react-google-places-autocomplete/dist/index.min.css';
import './style.scss';
import { API_URL } from '@app/constants.js';
import axios from 'axios';

class SampeProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            isEditing: false,
            isDelDlg: false,
            uploadingError: false,
            message: "",
            success: "false",
            id: 1,
            gender: false,
            image: null,
            file: null,
            name: "",
            address: "",
            breed: "",
            age: "",
            weight: "",
            neutered: "",
            medicalCondition: "",
            temperament: "",
            owners: [],
            friendly: false,
            withkids: false,
            withdogs: false,
            withcats: false,
            skittish: false,
            aggressive: false,
            calm: false,
            playful: false,
            temperamentModal: false,
        }
    }

    onFetchData = () => {
        axios.get(`${API_URL}sample?id=${1}`).then((res) => {
            const { pet, owners } = res.data;

            let tmp = [];
            (owners).forEach(element => {
                tmp.push(element);
            });

            this.setState(pet);
            this.setState({ owners: tmp });
            const { temperament } = pet;
            temperament[0] === "1" ? this.setState({ friendly: true }) : this.setState({ friendly: false });
            temperament[1] === "1" ? this.setState({ withkids: true }) : this.setState({ withkids: false });
            temperament[2] === "1" ? this.setState({ withdogs: true }) : this.setState({ withdogs: false });
            temperament[3] === "1" ? this.setState({ withcats: true }) : this.setState({ withcats: false });
            temperament[4] === "1" ? this.setState({ skittish: true }) : this.setState({ skittish: false });
            temperament[5] === "1" ? this.setState({ aggressive: true }) : this.setState({ aggressive: false });
            temperament[6] === "1" ? this.setState({ calm: true }) : this.setState({ calm: false });
            temperament[7] === "1" ? this.setState({ playful: true }) : this.setState({ playful: false });
        })
            .catch((err) => {

            });
    };

    componentDidMount() {
        this.onFetchData();
    };
    temperamentToggleModal = () => {
        const { temperamentModal, isEditing } = this.state;
        if (isEditing) {
            this.setState({ temperamentModal: !temperamentModal })
        }
    };

    handleInputChange = (e) => {
        const { isEditing } = this.state;

        const { name, checked } = e.target;
        if (isEditing) {
            this.setState({ [name]: checked });
        }

    };

    OnHandleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    OnAddOwner = () => {
        let arr = this.state.owners;
        arr.push({ owner: { name: "" }, phone_numbers: [{ "phone_number": "" }] });
        this.setState({ owners: arr });
    };

    OnAddPhone = (index) => {
        let arr = this.state.owners;
        arr[index].phone_numbers.push({ "phone_number": "" });
        this.setState({ owners: arr });
    };

    OnDeletePhone = (i, j) => {
        let arr = this.state.owners;
        if (arr[i].phone_numbers[j].id) {
            arr[i].phone_numbers[j] = { ...arr[i].phone_numbers[j], "deleted": true }
            this.setState({ owners: arr });
        } else {
            let filteredArray = arr[i].phone_numbers.filter((item, index) => {
                return index !== j;
            });
            arr[i].phone_numbers = filteredArray;
            this.setState({ owners: arr });
        }
    };

    OnDeleteOwner = (index) => {

        let tmpOwner = this.state.owners;

        if (tmpOwner[index].owner.id) {
            tmpOwner[index].owner = { ...tmpOwner[index].owner, "deleted": true };
            this.setState({ owners: tmpOwner });
        } else {
            let filteredArray = tmpOwner.filter((item, it) => {
                return it !== index;
            });
            this.setState({ owners: filteredArray });
        }
    };

    OnOwnerNameChange = (e) => {
        const { name, value } = e.target;
        let arr = this.state.owners;
        arr[name]["owner"].name = value;
        this.setState({ owners: arr });
    };

    OnOwnerPhoneChange = (e) => {

        const { name, value } = e.target;

        let arr = this.state.owners;
        let nameIndex = "";
        let i;
        for (i = 0; name[i] !== ','; i++) {
            nameIndex += name[i];
        }
        let phoneIndex = "";
        for (let j = i + 1; j < name.length; j++) {
            phoneIndex += name[j];
        }
        arr[nameIndex * 1]["phone_numbers"][phoneIndex * 1].phone_number = value;
        this.setState({ owners: arr });
    };

    OnEnableEditing = () => {
        this.setState({ isEditing: true });
    };

    OnSaveEditing = () => {
        this.setState({ isEditing: false });
        this.SaveChange();
    };

    OnHandleFileChange = (dataUri, file) => {
        this.setState({ image: dataUri, file: file });
    };

    SaveChange = () => {

        const { name, id, gender, address, breed, age, weight, neutered,
            medicalCondition, owners } = this.state;

        let year = new Date().getFullYear();
        if (age * 1 < 1980 || age * 1 > year) {
            this.setState({ uploadingError: true, message: "Please Input Correct Birth Year", success: false });
            return;
        }

        const { friendly, withkids, withdogs, withcats, skittish, aggressive, calm, playful } = this.state;

        let temperament = "";
        friendly ? temperament += "1" : temperament += "0";
        withkids ? temperament += "1" : temperament += "0";
        withdogs ? temperament += "1" : temperament += "0";
        withcats ? temperament += "1" : temperament += "0";
        skittish ? temperament += "1" : temperament += "0";
        aggressive ? temperament += "1" : temperament += "0";
        calm ? temperament += "1" : temperament += "0";
        playful ? temperament += "1" : temperament += "0";

        let data = {
            "id": id,
            "name": name,
            "gender": gender,
            "address": address,
            "breed": breed,
            "age": age,
            "weight": weight,
            "neutered": neutered,
            "medicalCondition": medicalCondition,
            "temperament": temperament,
            "ownerNames": owners.filter(item => item.owner.name !== "")
        };

        const formData = new FormData();
        formData.append(
            "file",
            this.state.file
        );

        formData.append("data", JSON.stringify(data));

        this.setState({ inProgress: true });
        this.props.OnPetUpdate(formData, this.SaveChangeCallback);

    };

    SaveChangeCallback = (option, message) => {
        this.setState({ inProgress: false });
        this.setState({ uploadingError: true });
        this.setState({ success: option, message: message });
        if (option === true) {
            this.onFetchData();
        }
    };

    OnAfterCallbackAlert = () => {
        this.setState({ uploadingError: false });
    };

    OnPlaceLoaded = (place) => {
        this.setState({ address: place.formatted_address });
    };

    DiscardChange = () => {
        this.setState({ isEditing: false });
        this.onFetchData();
    };

    render() {
        const { friendly, withkids, withdogs, withcats, skittish, aggressive, calm, playful } = this.state;
        const { isDelDlg,
            isEditing, gender, name, address, breed, age, weight, neutered,
            medicalCondition, owners, success, uploadingError, message } = this.state;
        let neutered_val = '';
        let indexedAddr = "";
        if (gender === 'Male') {
            if (neutered === '1') {
                neutered_val = 'Neutered';
            } else {
                neutered_val = 'Not Neutered';
            }
        } else {
            if (neutered === '1') {
                neutered_val = 'Spayed';
            } else {
                neutered_val = 'Not Spayed';
            }
        }

        if (address !== null) {
            let addrArray = address.split(',');
            let addrLen = addrArray.length;

            if (addrLen >= 3) {
                indexedAddr = addrArray[addrLen - 3] + "," + addrArray[addrLen - 2] + "," + addrArray[addrLen - 1];
            } else if (addrLen === 2) {
                indexedAddr = addrArray[addrLen - 2] + "," + addrArray[addrLen - 1];
            } else {
                indexedAddr = addrArray;
            }

        }


        let fontSizeOfName = "25px";
        let lengthOfName = name.length;
        if (lengthOfName <= 6) {
            fontSizeOfName = "36px";
        } else if (lengthOfName <= 10) {
            fontSizeOfName = "30px";
        }
        let now = new Date();
        let birthYear = now.getFullYear() - age.substr(0,4);
        let birth = birthYear === 1 ? `${birthYear} year old` : `${birthYear} years old`;
        let temperamentStr = [];
        if (friendly) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"Friendly"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }
        if (withkids) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"With Kids"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }
        if (withdogs) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"With Dogs"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }
        if (withcats) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"With Cats"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }
        if (skittish) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"Skittish"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }
        if (aggressive) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"Aggressive"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }
        if (calm) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"Calm"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }

        if (playful) {
            temperamentStr.push(
                <div className="edit-profile-input" key={Math.random() * Math.PI}>
                    <input type="text" className="form-control" value={"Playful"} onClick={this.temperamentToggleModal} readOnly={true} />
                    <i className="fa fa-heart" />
                </div>
            )
        }

        const { inProgress } = this.state;
        let ownerNames = [];

        for (let i = 0; i < owners.length; i++) {
            if (owners[i].owner.deleted) {
                continue;
            }
            let phone_numbers = [];
            for (let j = 0; j < owners[i].phone_numbers.length; j++) {
                if (owners[i].phone_numbers[j].deleted) {
                    continue;
                }
                phone_numbers.push(
                    <div key={['name', i, 'phone', j].join('_')} style={{ display: "flex", flexDirection: "row" }}>
                        <div className="edit-owner-phone-input">
                            <input type="text" className="form-control" name={i + "," + j} value={owners[i].phone_numbers[j].phone_number} onChange={this.OnOwnerPhoneChange} readOnly={!isEditing} />
                            <i className="fa fa-phone" />
                        </div>
                        <i className="fa fa-plus-circle edit_profile_phone_number_plus_i" hidden={!isEditing} onClick={() => {
                            this.OnAddPhone(i);
                        }} />
                        <i className="fa fa-times edit_profile_phone_number_plus_i" hidden={!isEditing} onClick={() => {
                            this.OnDeletePhone(i, j);
                        }} aria-hidden="true" />
                    </div>
                );
            }

            ownerNames.push(

                <Row className="edit-owner-custom-row" key={['name', i].join('_')}>
                    <div style={{ display: "flex" }} >
                        <div className="edit-owner-input" >
                            <input type="text" className="form-control" name={i} value={owners[i].owner.name} onChange={this.OnOwnerNameChange} readOnly={!isEditing} />
                            <i className="fa fa-male" />
                        </div>
                        <i className="fa fa-times edit_profile_phone_number_plus_i" onClick={() => { this.OnDeleteOwner(i) }} hidden={!isEditing} aria-hidden="true" />
                    </div>
                    {phone_numbers}
                </Row>

            );
        }

        return (
            <>
                <MobileNavbar />
                <Container style={{ display: 'flex', padding: "0 5px 0 0" }}>
                    <Row>
                        <Col className="mr-auto ml-auto" lg="5" md="6" xs="12" style={{ display: "inline-flex", padding: "0" }}>
                            <div style={{ width: "15%", display: 'flex' }}>
                                <div style={{ width: "80%", backgroundColor: "#7FC4AF", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                                </div>
                                <div style={{ width: "5%" }} />
                                <div style={{ width: "5%", background: "rgb(33 221 163)" }} />
                            </div>
                            <div style={{ width: "85%", padding: "10px" }}>

                                <div style={{ display: "flex", marginTop: "110px" }}>
                                    <div className="edit-avatar-photo">
                                        {isEditing ? <ImageUpload handlefilechange={this.OnHandleFileChange} /> : <></>}
                                        {/* <img src={this.state.previewImg}/> */}
                                        <img src={this.state.image} alt="" />
                                        <i className="fa fa-camera" hidden={!isEditing} />
                                    </div>
                                    <div className="edit-profile-custom-name">
                                        <div className="trash-icon">
                                            {
                                                this.props.userData.email === "sample@barkrz.com" &&
                                                <span style={{ fontSize: "16px", textAlign: "right", color: "gray" }}>
                                                    {!isEditing ?
                                                        <span style={{ fontSize: "16px", textAlign: "right" }} onClick={this.OnEnableEditing}>Edit</span> :
                                                        <>
                                                            <span style={{ fontSize: "16px", textAlign: "right", marginRight: '7px' }} onClick={this.OnSaveEditing}> Save </span>
                                                            <span style={{ fontSize: "16px", textAlign: "right", marginLeft: '7px' }} onClick={this.DiscardChange}> Cancel </span>
                                                        </>
                                                    }
                                                </span>
                                            }
                                        </div>
                                        <span style={{ fontSize: "22px", fontWeight: "bold", marginLeft: '10px' }}>Hi, it's me...</span>
                                        <input style={{ fontSize: fontSizeOfName, fontWeight: "bold", textAlign: "right", color: "#dddddd", border: "none", width: "150px", marginLeft: "auto", marginTop: '20px' }} value={name} name="name" onChange={this.OnHandleChange} hidden={!isEditing} />
                                        <span style={{ fontSize: fontSizeOfName, fontWeight: "bold", textAlign: "right", color: "#66ddcd", border: "none", width: "150px", marginLeft: "auto", marginTop: '20px' }} hidden={isEditing}> {name} </span>
                                        <div style={{ height: "1px", backgroundColor: "#84f5d2" }} />
                                        <div className="edit-profile-input  ml-auto mt-2" style={{ width: "60%" }} hidden={isEditing}>
                                            <div className="address-span">{breed}</div>
                                            <i className="fa fa-paw" />
                                        </div>
                                        <div className="edit-profile-input ml-auto mt-2" hidden={!isEditing} style={{ height: '40px', width: "60%" }}>
                                            <input type="text" className="form-control" name="breed" value={breed} onChange={this.OnHandleChange} readOnly={!isEditing} />
                                            <i className="fa fa-paw" />
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-card">
                                    <span className="ml-2 font-weight-bold" style={{ fontSize: "22px" }}>My Information&nbsp; </span>
                                    <Row className="edit-profile-custom-row">
                                        <div className="edit-profile-input" style={{ height: '40px' }}>
                                            <input type="text" className="form-control" value={gender} hidden={isEditing} readOnly />
                                            <i className="fa fa-transgender" />
                                            <select name="gender" hidden={!isEditing} onChange={this.OnHandleChange} className="edit-profile-select">
                                                {gender === "Male" ? <>
                                                    <option className="text-center" value="Male" defaultValue>Male</option>
                                                    <option className="text-center" value="Female">Female</option></> :
                                                    <><option className="text-center" value="Male">Male</option>
                                                        <option className="text-center" value="Female" defaultValue>Female</option></>
                                                }
                                            </select>
                                        </div>
                                        <div className="edit-profile-input" hidden={isEditing}>
                                            <div className="address-span">{weight} lbs</div>
                                            <i className="fa fa-weight-hanging" />
                                        </div>
                                        <div className="edit-profile-input" style={{ height: '40px' }} hidden={!isEditing}>
                                            <input type="number" className="form-control" name="weight" value={weight} onChange={this.OnHandleChange} />
                                            <i className="fa fa-weight-hanging" />
                                        </div>
                                        {temperamentStr}
                                        {
                                            (medicalCondition !== null || isEditing) &&
                                            <div className="edit-profile-input" style={{ height: '40px' }}>
                                                <input type="text" className="form-control" name="medicalCondition" value={medicalCondition} onChange={this.OnHandleChange} readOnly={!isEditing} />
                                                <i className="fa fa-grin-beam" />
                                            </div>
                                        }
                                        <div className="edit-profile-input" style={{ height: '40px' }}>
                                            <input type="text" className="form-control" value={neutered_val} hidden={isEditing} readOnly />
                                            <i className="fa fa-heart-broken" />
                                            <select name="neutered" hidden={!isEditing} onChange={this.OnHandleChange} className="edit-profile-select">
                                                {
                                                    neutered === '1' ?
                                                        <>
                                                            <option className="text-center" value='1' selected={true}>{gender === "Male" ? "Neutered" : "Spayed"}</option>
                                                            <option className="text-center" value='0' >{gender === "Male" ? "Not Neutered" : "Not Spayed"}</option>
                                                        </> :
                                                        <>
                                                            <option className="text-center" value='1' >{gender === "Male" ? "Neutered" : "Spayed"}</option>
                                                            <option className="text-center" value='0' selected={true}>{gender === "Male" ? "Not Neutered" : "Not Spayed"}</option>
                                                        </>
                                                }
                                            </select>
                                        </div>
                                        <div className="edit-profile-input" style={{ height: '40px' }}>
                                            <input type="text" className="form-control" value={birth} readOnly={true} hidden={isEditing} />
                                            <input type="text" className="form-control" name="age" value={age} onChange={this.OnHandleChange} hidden={!isEditing} />
                                            <i className="fa fa-history" />
                                        </div>
                                        <div className="edit-profile-input" hidden={isEditing}>
                                            <div className="address-span">{indexedAddr}</div>
                                            <i className="fa fa-map-marker-alt" />
                                        </div>
                                        <div className="edit-profile-input" style={{ height: '40px' }} hidden={!isEditing}>
                                            <GooglePlacesAutocomplete
                                                placeholder={address}
                                                onSelect={(addr) => {
                                                    this.setState({ address: addr.description });
                                                }}
                                                inputStyle={{ height: '40px' }}
                                            />
                                            <i className="fa fa-map-marker-alt" />
                                        </div>
                                    </Row>
                                </div>
                                <div className="profile-card">

                                    <p className="font-weight-bold" style={{ fontSize: '22px' }}>
                                        Friendly Humans
                                </p>
                                    <p style={{ fontSize: '16px' }}>
                                        Owner Contact Information
                                </p>

                                    {ownerNames}
                                    <div className="text-center mt-4" hidden={!isEditing}>
                                        <button onClick={this.OnAddOwner} className="profile-plus-btn">
                                            <img src={require("@app/assets/img/plus-btn.png").default} width="30px" height="30px" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="save-contents-dialog-background" hidden={!isDelDlg}>
                    <div className="save-contents-dialog">
                        <span>Are you sure to delete?</span>
                        <button onClick={this.OnDeletePet}>Yes</button>
                        <button onClick={() => { this.setState({ isDelDlg: false }) }}>No</button>
                    </div>
                </div>
                {
                    inProgress &&
                    <Loading />
                }
                {
                    uploadingError &&
                    <Alert
                        message={message}
                        OnClose={this.OnAfterCallbackAlert}
                        success={success}
                    />
                }
                <Modal isOpen={this.state.temperamentModal} toggle={this.temperamentToggleModal} >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={this.temperamentToggleModal}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                        <h5
                            className="modal-title text-center"
                            id="exampleModalLabel"
                        >
                            Temperament
                        </h5>
                    </div>
                    <Row className="p-3 text-center">
                        <Col>
                            <div style={{ display: "inline-flex", flexDirection: "column" }}>
                                <label className="custom-check-box">Friendly
                                    <input name="friendly" checked={friendly} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-check-box">With Kids
                                    <input name="withkids" checked={withkids} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-check-box">With Dogs
                                    <input name="withdogs" checked={withdogs} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-check-box">With Cats
                                    <input name="withcats" checked={withcats} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </Col>
                        <Col>
                            <div style={{ display: "inline-flex", flexDirection: "column" }}>
                                <label className="custom-check-box">Skittish
                                    <input name="skittish" checked={skittish} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-check-box">Aggressive
                                    <input name="aggressive" checked={aggressive} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-check-box">Calm
                                    <input name="calm" checked={calm} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                                <label className="custom-check-box">Playful
                                    <input name="playful" checked={playful} onChange={this.handleInputChange} type="checkbox" />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

class ImageUpload extends Component {
    handleFile = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) return;

        reader.onload = function (img) {
            ReactDom.findDOMNode(this.refs.in).value = "";
            this.props.handlefilechange(img.target.result, file);
        }.bind(this);
        reader.readAsDataURL(file);
    };

    render() {

        return (
            <input ref="in" type="file" accept="image/*" onChange={this.handleFile} />
        );
    }
}

const mapStateToProps = state => {
    return {
        petsInformation: state.petsInformation,
        userData: state.auth.userdata,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        OnPetUpdate: (data, callback) => dispatch(PetUpdate(data, callback)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SampeProfilePage);
