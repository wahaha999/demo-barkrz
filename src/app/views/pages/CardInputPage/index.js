import React, { Component } from 'react';
import { Container, Input, Row } from "reactstrap";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import Swal from 'sweetalert2';
import images from 'react-payment-inputs/images'
import { SaveCard } from "@app/actions/auth";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import { API_URL } from "@app/constants.js";
import Alert from "@app/views/components/Alert";
import Loading from "@app/views/components/Loading";
import './style.scss';

class CardInputPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            cvc_input: '',
            expiry_input: '',
            name_input: '',
            number_input: '',
            validationError: false,
            coupon: '',
            couponType: 0,
            couponMsg: '',
            isCouponCorrect: false,
            errorMsg: '',
            isValidCard: false,
            inProgress: false,
            stripePromise: '',
            selectedOption: 'Yes'
        }
    }

    radioChange = (e) => {
        this.setState({
            selectedOption: e.currentTarget.value
        });
    }

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };

    OnHandleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    HandleMembershipWithCoupon = () => {

        let token = this.props.userdata.token;
        const header = { headers: { Authorization: `Bearer ${token}` } };
        let data = {
            coupon: this.state.coupon,
        };

        this.setState({ inProgress: true });
        axios.post(`${API_URL}coupon`, data, header).then((res) => {
            this.setState({ inProgress: false });
            if (!res.data.expired) {
                if (res.data.success === 0) {
                    this.setState({ errorMsg: res.data.message, validationError: true });
                    this.setState({ inProgress: false });
                } else {
                    this.setState({ isCouponCorrect: true, couponType: res.data.success });
                }
            } else {
                this.props.logout();
            }
        })
            .catch(err => {
                this.setState({ errorMsg: err.message, validationError: true });
                this.setState({ inProgress: false });
            });
    }

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            if (target.value) {
                this.setState({
                    [target.name]: target.value.replace(/ /g, ''),
                });
            }
        }
        else if (target.name === 'expiry') {
            if (target.value) {
                this.setState({
                    [target.name]: target.value.replace(/ |\//g, ''),
                });
            }
        }
        else {
            this.setState({
                [target.name]: target.value,
            });
        }
        this.setState({ [target.name + "_input"]: target.value });
    };

    handleCallback = (type, isValid) => {
        this.setState({ isValidCard: isValid });
    };

    componentDidMount() {
        let membership_created = this.props.userdata.membership_created;
        if(membership_created){
            this.setState({selectedOption:"No"});
        }
    }

    OnConfirm = (e) => {
        e.preventDefault();

        let token = this.props.userdata.token;
        const header = { headers: { Authorization: `Bearer ${token}` } };
        // nocard is "No", use the existing card,
        let data = {
            cvc: this.state.cvc_input,
            expiry: this.state.expiry_input,
            name: this.state.name_input,
            number: this.state.number_input,
            membership: this.props.petInformation.membership,
            nocard: this.state.selectedOption,
            couponcode: this.state.coupon
        };

        if (!this.Validation()) {
            return;
        }

        this.setState({ inProgress: true });
        axios.post(`${API_URL}save_card`, data, header).then((res) => {
            this.setState({ inProgress: false });
            if (!res.data.expired) {
                if (res.data.success === false) {
                    this.setState({ errorMsg: res.data.message, validationError: true });
                    this.setState({ inProgress: false });
                } else {
                    this.props.OnSaveCard(res.data, (option, message) => {
                        if (option) {
                            Swal.fire({
                                text: res.data.couponMessage,
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 3000,
    
                            }).then(() => {
                                this.props.history.push('/petsList');
                            })
                        }
                    });
                }
            } else {
                this.props.logout();
            }
        })
            .catch(err => {
                this.setState({ errorMsg: err.message, validationError: true });
                this.setState({ inProgress: false });
            });
    };

    Validation() {
        const { name, cvc, expiry, number, isValidCard } = this.state;
        let selectedOption = this.state;
        // if use existing card, then ignore
        if(selectedOption === "Yes"){
            if (name === "" || cvc === "" || expiry === "" || number === "") {
                this.setState({ errorMsg: "Please fill in the gaps", validationError: true });
                return false
            }
    
            if (!isValidCard) {
                this.setState({ errorMsg: "Input Correct Card Number", validationError: true });
                return false
            }
        }
        
        return true;
    }

    render() {
        let membership_created = this.props.userdata.membership_created;
        const {card_last_four, card_brand} = this.props.userdata;
        const {visa, placeholder ,mastercard ,jcb ,amex ,dinersclub ,discover } = images;
        let cardText = "Use existing card: XXXX XXXX XXXX " + card_last_four;
        let cardType = card_brand;
        let cardSVG = placeholder;

        switch(cardType) {
            case "Visa":
            case "Visa Electron":
                cardSVG = visa;
                break;
            case "MasterCard":
                cardSVG = mastercard;
                break;
            case "AMEX":
                cardSVG = amex;
                break;
            case "Discover":
                cardSVG = discover
                break;
            case  "Diners":
            case "Diners - Carte Blanche":
                cardSVG = dinersclub;
                break;
            case "JCB":
                cardSVG = jcb;
                break;
            default:
        }

        return (
            <>
                <MobileNavbar />
                <Container style={{ marginTop: "100px" }}>
                    <div id="PaymentForm">
                        {
                            membership_created != null ?
                                <div className="ml-auto mr-auto">
                                    <div className="credit_card_input">
                                        <div style={{ display: 'flex' }}>
                                            <label>
                                                <input type="radio"
                                                    value="No"
                                                    checked={this.state.selectedOption === "No"}
                                                    onChange={this.radioChange} />
                                                <span>&nbsp;{cardText}</span>
                                                <svg width="24" height="16" className="ml-2 mt-auto mb-auto">
                                                    {cardSVG}
                                                </svg>
                                            </label>
                                        </div>
                                        <label>
                                            <input type="radio"
                                                value="Yes"
                                                checked={this.state.selectedOption === "Yes"}
                                                onChange={this.radioChange} /> Use another card
                                        </label>
                                    </div>
                                </div> : ""
                        }

                        <div className="ml-auto mr-auto">
                            <div className="credit_card_input">
                                <Input
                                    type="tel"
                                    name="number"
                                    id="number"
                                    placeholder="Card Number"
                                    disabled = {this.state.selectedOption === "No" ? "disabled" : ""}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    value={this.state.number_input}
                                />
                            </div>
                            <div className="credit_card_input">
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    disabled = {this.state.selectedOption === "No" ? "disabled" : ""}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    value={this.state.name_input}
                                />
                            </div>
                            <div className="credit_card_input credit_card_cvc_input">
                                <Input
                                    type="tel"
                                    name="expiry"
                                    id="expiry"
                                    placeholder="Expiry Date"
                                    disabled = {this.state.selectedOption === "No" ? "disabled" : ""}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    value={this.state.expiry_input}
                                />
                                <Input
                                    type="tel"
                                    name="cvc"
                                    placeholder="CVC"
                                    id="cvc"
                                    disabled = {this.state.selectedOption === "No" ? "disabled" : ""}
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                    value={this.state.cvc_input}
                                />
                            </div>

                            {
                                membership_created != null ? "" :
                                    <div className="coupon_input">
                                        <input type="text" name="coupon" placeholder="Coupon Code" value={this.state.coupon} onChange={this.OnHandleChange} className="form-control" />
                                        {/* <button className="btn btn-primary" onClick={this.HandleMembershipWithCoupon}>OK</button> */}
                                    </div> 
                            }
                            <div className="credit_card_input" style={{ textAlign: "center" }}>
                                Total amount to pay is
                                {
                                    this.props.petInformation.membership === 1 ? <span> $2.99. </span> : <span> $29.99.</span>
                                }
                            </div>

                            <div className="credit_card_input">
                                <button type="submit" className="btn btn-primary" onClick={this.OnConfirm} >Confirm</button>
                            </div>
                        </div>
                        
                    </div>
                    <Row style={{ alignItems: 'center', textAlign: 'center', flexDirection: 'column', display: 'flex', marginTop: '20px', marginBottom: '20px', fontFamily: 'auto', color: 'black' }}>

                    </Row>
                    {
                        this.state.validationError &&
                        <Alert
                            message={this.state.errorMsg}
                            OnClose={() => { this.setState({ validationError: false }) }}
                            success={false}
                        />
                    }
                    {
                        this.state.inProgress &&
                        <Loading />
                    }

                </Container>

            </>
        );


    }
}


const mapStateToProps = state => {
    return {
        petInformation: state.petsInformation,
        userdata: state.auth.userdata,
    };
};

const mapDispatchToProps = dispatch => ({

    OnSaveCard: (data, callback) => dispatch(SaveCard(data, callback)),
    logout: () => {
        dispatch({ type: "LOGOUT" });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CardInputPage);