import React , {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import {PetFetchAll} from "@app/actions/pet";
// import './style.scss';


const galleryImages = [
    require("@app/assets/img/gallery/gallery01.jpg").default,
    require("@app/assets/img/gallery/gallery02.jpg").default,
];

class AprofPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Pets: {},
            componentMounted : false
        }
    }

    componentDidMount() {
        this.setState({componentMounted: true});
    }
    OnCardClick = (index)=> {
        this.props.history.push(`/edit-profile/${index}`);
    };
    render() {
        const {Pets} =  this.props.petsInformation;
        let petsList = [];
        let len = Pets.length !== 0;

        if(!this.state.componentMounted) {
            return <></>
        }

        Pets.forEach((value,index)=>{
            let fontSizeOfName = "45px";
            let lengthOfName = value.pet.name.length;
            if (lengthOfName <= 6 ) {
                fontSizeOfName = "64px";
            } else if(lengthOfName <= 10) {
                fontSizeOfName = "50px";
            }

            petsList.push(
                <div  className="text-center"  key={index * 101 + "unique"} style={{display:"flex", flexDirection:"column"}} onClick={()=>{
                    this.props.history.push(`/edit-profile/${index}`);
                }} >
                    <span style={{color: "#1ce4ff",marginTop: "15px",fontSize:fontSizeOfName,fontWeight: "bold"}}> {value.pet.name} </span>
                    <img data-u="image" className="img-circle" src={value.pet.image} style={{border:"solid 0px",padding: "120px"}} alt="" />
                </div>
            );
        });

        return(
            <>
                <MobileNavbar />
                <div
                    className="page-header"
                    style={{
                        backgroundColor: "white"
                    }}
                >

                    <Container style={{marginTop:"136px"}}>
                        {
                            len &&
                            <Row>
                                <Col className="ml-auto mr-auto text-center" lg="4"  md="6" xs="12" >
                                    <div id="jssor_1" style={{position:"relative",top:"0px" ,left:"0px",width:"980px",height:"640px",overflow:"hidden"}}>
                                        <div data-u="slides" style={{position:"absolute" ,top:"0px"  ,left:"-36px" ,width:"980px",height:"640px",overflow:"hidden"}}>
                                            {petsList}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        }
                        <Row className="mb-3">
                            <Col className="ml-auto mr-auto text-center" lg="4"  md="6" xs="12" >
                                {!len &&
                                    <span className="aprof_span">Create a Pet Profile</span>
                                }
                            </Col>
                        </Row>
                        <Row>
                             <Col lg="4"  md="6"  xs="12" className="mb-3 ml-auto mr-auto text-center">
                                <div className="text-center mb-3">
                                    {
                                        !len &&
                                        <div className="avatar-photo">
                                            <img src={galleryImages[1]} alt="gallery" />
                                        </div>
                                    }
                                </div>
                                <button className="aprof_button ml-auto mr-auto mt-5" onClick={()=>{this.props.history.push("/gene")}}>
                                    <img src={require("@app/assets/img/plus-btn.png").default} width="80px" height="80px" alt="" />
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </div>         
            </>
        );
    }
}

const mapStateToProps = state => {
    return {petsInformation: state.petsInformation};
};

const mapDispatchToProps = dispatch => ({
    PetFetchAll:(callback)=>dispatch(PetFetchAll(callback)),
});

export default connect(mapStateToProps , mapDispatchToProps)(AprofPage);
