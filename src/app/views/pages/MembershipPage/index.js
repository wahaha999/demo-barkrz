import React, { Component } from 'react';
import { Button, Container, Row, Col } from "reactstrap";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import './style.scss';
import connect from "react-redux/es/connect/connect";
import { Pet_Membership } from "@app/actions/pet";
import { API_URL } from "@app/constants.js";
import axios from "axios";
import { Login_Success } from "@app/actions/auth";
import Loading from "@app/views/components/Loading";
import Alert from "@app/views/components/Alert";

class MembershipPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false,
            error: false,
            errorMsg: '',
            sucess: false,
            successMsg: '',
        }
    }

    SetMembership = (data) => {
        this.props.SetMembership(data);
        this.props.history.push('/card-input');
    };

    render() {
        let memebership_plan = ['2', '2', '29'];
        let content = [];
        let membership_data = [
            { title: 'On Demand Access', barkrz: true, tags: true, microchip: false },
            // {title: 'Digital profile',barkrz: true , tags: false , microchip: true},
            { title: 'Online Pet Profile', barkrz: true, tags: false, microchip: false },
            { title: 'Modify Contacts', barkrz: true, tags: false, microchip: true },
            { title: 'Auto Email Notifications', barkrz: true, tags: false, microchip: false },
            { title: 'SMS Notifications', barkrz: true, tags: false, microchip: false },
            { title: 'No Paperwork at the Vet', barkrz: true, tags: false, microchip: false },
            { title: 'Visible Tag', barkrz: true, tags: true, microchip: false },
            { title: 'Reusable', barkrz: true, tags: false, microchip: false },
            { title: 'Store More Pet Info', barkrz: true, tags: false, microchip: false },
            { title: 'Access to digital pet community', barkrz: true, tags: false, microchip: false },
        ];
        let membership_content = [];

        membership_data.forEach((item) => {
            membership_content.push(
                <tr key={Math.random() * Math.PI}>
                    <td>
                        {item.title}
                    </td>
                    <td>
                        {item.barkrz ? <i className="fa fa-check green" /> : <i className="fa fa-times red" />}
                    </td>
                    <td>
                        {item.tags ? <i className="fa fa-check green" /> : <i className="fa fa-times red" />}
                    </td>
                    <td>
                        {item.microchip ? <i className="fa fa-check green" /> : <i className="fa fa-times red" />}
                    </td>
                </tr>
            )
        });
        membership_content.push(
            <tr key={Math.random() * Math.PI}>
                <td>
                    Cost
                </td>
                <td>
                    $15
                </td>
                <td>
                    $20
                </td>
                <td>
                    more than $25
                </td>
            </tr>
        );


        for (let i = 1; i <= 3; i++) {
            content.push(
                <Col lg="4" key={Math.random() * Math.PI} >
                    <div className="membership_big_card">
                        <div className="membership_card">
                            <div><span className="membership_join_span"> Join Barkrz </span></div>
                            <div>
                                <sup style={{ fontSize: "36px", top: "-36px" }}> $ </sup><span style={{ fontSize: "90px", fontWeight: "bold" }}>{memebership_plan[i - 1]}</span><sup style={{ fontSize: "27px", top: "-30px" }}> 95 </sup>
                            </div>
                            <div>
                                <span>*plus one time $<strong>1</strong> Dog tag</span>
                            </div>
                            <div>
                                <span style={{ fontSize: " 21px" }}>per user per monthly</span>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <span className="font-weight-bold" style={{ fontSize: "18px", textAlign: "center", color: "#0f8a7f", textDecorationLine: 'underline' }}>Package Includes</span>
                        </div>
                        <Row className="pl-3 mt-2">
                            <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                            <span className="ml-2 membership-span-second" >No paper work at the vet</span>
                            <span className="membership-span-third">
                                <i className="fa fa-check-circle" />
                            </span>
                        </Row>
                        <Row className="pl-3 mt-2">
                            <span className="mt-1 membership-span-first" ><i className="fa fa-circle" /></span>
                            <span className="ml-2 membership-span-second">No paper work at the vet</span>
                            <span className="membership-span-third">
                                <i className="fa fa-check-circle" />
                            </span>
                        </Row>
                        <Row className="pl-3 mt-2">
                            <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                            <span className="ml-2 membership-span-second">No paper work at the vet</span>
                            <span className="membership-span-third">
                                <i className="fa fa-check-circle" />
                            </span>
                        </Row>
                        <Row className="pl-3 mt-2">
                            <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                            <span className="ml-2 membership-span-second">No paper work at the vet</span>
                            <span className="membership-span-third">
                                <i className="fa fa-check-circle" />
                            </span>
                        </Row>
                        {
                            this.props.isLoggedIn == true ?
                                <Row className="mt-5" style={{ justifyContent: "center" }}>
                                    {this.props.userdata.membership == i ?
                                        <Button className="btn-lg" style={{ borderRadius: "2px", padding: "10px", border: "none", backgroundColor: "#0f8a7f" }} disabled={true}>Joined</Button> :
                                        <Button className="btn-lg" style={{ borderRadius: "2px", padding: "10px", border: "none", backgroundColor: "#0f8a7f" }} onClick={() => this.SetMembership(i)}>Join Now</Button>
                                    }
                                </Row>
                                : ""

                        }
                    </div>
                </Col>
            );
        }
        return (
            <>
                <MobileNavbar />
                <Container style={{ marginTop: "100px" }}>
                    <Row className="" style={{ alignItems: 'center', textAlign: 'center', flexDirection: 'column', display: 'flex', marginTop: '20px', marginBottom: '20px', color: 'black' }}>
                        <div style={{ fontSize: "27px" }}>
                            Be a Part of our Family
                        </div >
                        <div style={{ fontSize: "18px", marginLeft: '10px', marginRight: '10px' }}>
                            Take a look at our membership packages and see why Barkrz is best for your Pet
                        </div>
                    </Row>

                    <Row style={{ justifyContent: 'center' }}>
                        <Col lg="4" key={Math.random() * Math.PI} >
                            <div className="membership_big_card" onClick={() => {
                                if (this.props.userdata.membership != 1) {
                                    this.SetMembership(1)
                                }
                            }}>
                                <div className="membership_card">
                                    <div>
                                        <span className="membership_join_span"> Monthly <br /> Subscription </span>
                                    </div>
                                    <div>
                                        <sup style={{ fontSize: "36px", top: "-36px" }}> $ </sup><span style={{ fontSize: "90px", fontWeight: "bold" }}>2</span><sup style={{ fontSize: "27px", top: "-30px" }}> 99 </sup>
                                    </div>
                                    <div style={{ marginTop: "22px" }}>
                                        <span style={{ fontSize: " 14px" }}>Plus $1.99/month per additional pet</span>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <span className="font-weight-bold" style={{ fontSize: "18px", textAlign: "center", color: "#0f8a7f", textDecorationLine: 'underline' }}>Package Includes</span>
                                </div>
                                <Row className="pl-3 mt-2">
                                    <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                                    <span className="ml-2 membership-span-second" ><span>No paper work at the vet</span></span>
                                    <span className="membership-span-third">
                                        <i className="fa fa-check-circle" />
                                    </span>
                                </Row>
                                <Row className="pl-3 mt-2">
                                    <span className="mt-1 membership-span-first" ><i className="fa fa-circle" /></span>
                                    <span className="ml-2 membership-span-second">Digital Pet Profile</span>
                                    <span className="membership-span-third">
                                        <i className="fa fa-check-circle" />
                                    </span>
                                </Row>
                                <Row className="pl-3 mt-2">
                                    <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                                    <span className="ml-2 membership-span-second">Access to Barkrz Community</span>
                                    <span className="membership-span-third">
                                        <i className="fa fa-check-circle" />
                                    </span>
                                </Row>
                                {
                                    this.props.isLoggedIn == true ?
                                        <Row className="mt-5" style={{ justifyContent: "center" }}>
                                            {this.props.userdata.membership == 1 ?
                                                <Button className="btn-lg" style={{ borderRadius: "2px", padding: "10px", border: "none", backgroundColor: "#0f8a7f" }} disabled={true}>Joined</Button> :
                                                <Button className="btn-lg" style={{ borderRadius: "2px", padding: "10px", border: "none", backgroundColor: "#0f8a7f" }} >Join Now</Button>
                                            }

                                        </Row> : ""
                                }

                            </div>
                        </Col>

                        <Col lg="4" key={Math.random() * Math.PI} >
                            <div className="membership_big_card" onClick={() => {
                                if (this.props.userdata.membership != 2) {
                                    this.SetMembership(2)
                                }
                            }}>
                                <div className="membership_card">
                                    <div><span className="membership_join_span"> Yearly <br /> Subscription </span></div>
                                    <div>
                                        <sup style={{ fontSize: "36px", top: "-36px" }}> $ </sup><span style={{ fontSize: "90px", fontWeight: "bold" }}>29</span><sup style={{ fontSize: "27px", top: "-30px" }}> 99 </sup>
                                    </div>

                                    <div style={{ marginTop: "22px" }}>
                                        <span style={{ fontSize: " 14px" }}>Plus $1.99/month per additional pet</span>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <span className="font-weight-bold" style={{ fontSize: "18px", textAlign: "center", color: "#0f8a7f", textDecorationLine: 'underline' }}>Package Includes</span>
                                </div>

                                <Row className="pl-3 mt-2">
                                    <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                                    <span className="ml-2 membership-span-second" >No paper work at the vet</span>
                                    <span className="membership-span-third">
                                        <i className="fa fa-check-circle" />
                                    </span>
                                </Row>
                                <Row className="pl-3 mt-2">
                                    <span className="mt-1 membership-span-first" ><i className="fa fa-circle" /></span>
                                    <span className="ml-2 membership-span-second">Digital Pet Profile</span>
                                    <span className="membership-span-third">
                                        <i className="fa fa-check-circle" />
                                    </span>
                                </Row>
                                <Row className="pl-3 mt-2">
                                    <span className="mt-1 membership-span-first"><i className="fa fa-circle" /></span>
                                    <span className="ml-2 membership-span-second">Access to Barkrz Community</span>
                                    <span className="membership-span-third">
                                        <i className="fa fa-check-circle" />
                                    </span>
                                </Row>
                                {
                                    this.props.isLoggedIn == true ?
                                        <Row className="mt-5" style={{ justifyContent: "center" }}>
                                            {this.props.userdata.membership == 2 ?
                                                <Button className="btn-lg" style={{ borderRadius: "2px", padding: "10px", border: "none", backgroundColor: "#0f8a7f" }} disabled={true}>Joined</Button> :
                                                <Button className="btn-lg" style={{ borderRadius: "2px", padding: "10px", border: "none", backgroundColor: "#0f8a7f" }}>Join Now</Button>
                                            }

                                        </Row>
                                        : ""
                                }
                            </div>
                        </Col>
                        {/* {content} */}
                    </Row>
                    <Row className="mb-5">
                        <Col md='12' style={{ position: "relative" }}>
                            <div style={{ height: "1px", backgroundColor: "#d3d3d3", margin: '15px' }} />
                            <i className={"fa fa-paw"} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: "translate(-50%, -50%)",
                                fontSize: '25px',
                                color: '#d3d3d3',
                            }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '50px', marginLeft: '15px', marginRight: '15px' }}>
                        <table className='table-bordered text-center membership-table' style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: 'white' }} />
                                    <th>Barkrz</th>
                                    <th>Basic Tags</th>
                                    <th>Microchip</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membership_content}
                            </tbody>
                        </table>
                    </Row>
                </Container>
                {
                    this.state.error &&
                    <Alert
                        message={this.state.errorMsg}
                        OnClose={() => { this.setState({ error: false }); }}
                        success={false}
                    />
                }
                {
                    this.state.success &&
                    <Alert
                        message={this.state.successMsg}
                        OnClose={() => {
                            this.setState({ success: false });
                            this.props.history.push('/petsList');
                        }}
                        success={true}
                    />
                }
                {
                    this.state.inProgress &&
                    <Loading />
                }

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        petInformation: state.petsInformation,
        userdata: state.auth.userdata,
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => ({
    SetMembership: (data) => dispatch(Pet_Membership(data)),
    logout: () => {
        dispatch({ type: "LOGOUT" });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MembershipPage);