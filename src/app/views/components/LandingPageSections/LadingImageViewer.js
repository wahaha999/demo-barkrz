import React , {Component} from 'react';

class LandingImage extends Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { src ,...rest} = this.props;
        return(
            <>     
            <div className="landing-gallery-img">
                <img src={src} {...rest} alt=""/>
                <div className="gallery-item-overlay">
                    <i className="fa fa-search-plus" />
                </div>
            </div>
            </>
        );
    }
}

export default LandingImage;
