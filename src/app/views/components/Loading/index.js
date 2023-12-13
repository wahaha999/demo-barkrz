import React , {Component} from 'react'
import LoaderGif from '@app/assets/img/Curve-Loading.gif';
import './style.scss';

class Loading extends Component {
    state = {
        
    }

    render() {
        return (
            <div className="loader-container" >
                <div className="loader">
                    <img src={LoaderGif}  alt="loading" />
                </div>   
            </div>    
        )
    }
}

export default Loading;
