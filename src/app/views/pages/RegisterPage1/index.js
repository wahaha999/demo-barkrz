import React , {Component} from 'react';
import {connect} from 'react-redux';
import {OnRegisterPetAddrAndBreed} from '@app/actions/regsiterPet'
import { Container, Row, Col } from "reactstrap";
import MobileNavbar from "@app/views/components/Navbars/MobileNavbar.js";
import Autocomplete from "@app/views/components/AutoComplete";
import Alert from "@app/views/components/Alert";
import SearchBar from "@app/views/components/SearchBar";
import axios from "axios";
import './style.scss';

class Register1Page extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:"",
            breed:"",
            validationError:false,
            validationErrorMsg:"",
            allBreeds: []
        }
    }

    handleInputChange = (e) => {
        const {name , value} = e.target;
        this.setState({[name]: value});
    };

    onClickSuggestion = (suggestion) => {
        this.setState({breed: suggestion});
    }

    fetchAllBreeds = () => {
        axios.get("https://dog.ceo/api/breeds/list/all").then((res) => {
            var breeds = Object.keys(res.data.message).map((item) => item.charAt(0).toUpperCase() + item.slice(1));
            this.setState({ allBreeds: breeds });
        });
    }

    componentDidMount() {
        const {address, breed} = this.props.registerPetInfo;
        this.setState({address: address , breed: breed});
        this.fetchAllBreeds();
    };

    Next = ()=> {
        const {address,breed} = this.state;
        if (address === "" ) {
            this.setState({validationError: true , validationErrorMsg: "Please Fill the Address field"});
            return;
        } else if (breed === "") {
            this.setState({validationError: true , validationErrorMsg: "Please Fill the Breed field"});
            return;
        }
        this.props.SetAddrAndBreed({address:address, breed:breed});
        this.props.history.push("/register2");
    };

    Prev = ()=> {
        this.props.history.goBack();
    };

    OnPlaceLoaded = (place)=> {
        this.setState({address: place.formatted_address});

    };

    render() {
        const {breed} = this.state;
        const {validationError , validationErrorMsg, allBreeds} = this.state;

        return(
            <>
                <MobileNavbar icon="fa fa-chevron-left"/>                  
                <Container  style={{marginTop:"136px"}}>
                    <Row>  
                        <Col lg="4"  className="mb-5 ml-auto mr-auto text-center">                            
                            <div className="text-center">        
                                <span className="font-weight-bold" style={{fontSize: "26px", textAlign: "center" , color:"black"}}>Where am I from?</span>
                            </div>

                            <div className="mt-2 mb-2" style={{textAlign: "left", color: "white"}}>
                                <div className="custom-input">
                                    <SearchBar className="form-control" onPlaceLoaded = {this.OnPlaceLoaded} style={{borderColor: "white", backgroundColor: "rgb(238, 238, 238)"}}/>
                                    <span>
                                        <i className="fa fa-search" style={{fontSize: "18px"}}/>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" className="mb-5 ml-auto mr-auto text-center">                            
                            <div className="text-center">        
                                <span className="font-weight-bold" style={{fontSize: "26px", textAlign: "center" , color:"black"}}>My breed is...</span>
                            </div>                      
                            <Autocomplete                                
                                value={breed}
                                suggestions={allBreeds}
                                onClick={this.onClickSuggestion}
                                onChange={this.handleInputChange}
                            />                            
                        </Col>
                    </Row>
                    <Row className="text-center mt-5  mb-3" style={{position:"relative"}}>
                        <Col lg="4" className="ml-auto mr-auto text-center">
                           <div>
                                <button onClick={this.Prev} className="btn btn-primary mr-1 ">
                                    Prev
                                </button>   
                                <button onClick={this.Next} className="btn btn-primary ml-1">
                                    Next
                                </button>   
                            </div>
                        </Col>
                    </Row>
                </Container>
                {
                    validationError &&
                    <Alert
                        message={validationErrorMsg}
                        OnClose={()=>{this.setState({validationError:false})}}
                        success={false}
                    />
                }
            </>
        );
    }
}


const mapStateToProps = state => {
    return {registerPetInfo: state.registerPetInfo};
};
  
const mapDispatchToProps = dispatch => ({
    SetAddrAndBreed: (data) => dispatch(OnRegisterPetAddrAndBreed(data)),
});
  
export default connect(mapStateToProps , mapDispatchToProps)(Register1Page);
