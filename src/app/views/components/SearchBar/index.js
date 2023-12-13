import React from "react";
/* global google */

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
    }

    componentDidMount() {

        this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
            {"types": ["geocode"]});

        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    handlePlaceChanged = ()=>{
        const place = this.autocomplete.getPlace();
        this.props.onPlaceLoaded(place);
    }

    render() {
        const {...rest} = this.props;
        return (
            <input ref={this.autocompleteInput}  id="autocomplete" placeholder="Enter your address"
                   type="text"  {...rest}/>
        );
    }
}

export default SearchBar;