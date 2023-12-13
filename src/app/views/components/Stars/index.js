import React , {Component} from 'react';

import './style.scss';

class Stars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    loadStars = () => {
        let i = 0;
        let domStars = [];
        do { 
            domStars.push(<img key={i} src={require("@app/assets/svgs/yellow-star.svg").default} alt="Yellow star" />)
            i++;
        } while (this.props.number > i);
        return domStars;
    }

    render() {
        return(
            <>  
                <div className="five-stars">
                    {this.loadStars()}
                </div>
            </>
        );
    }
}

export default Stars;