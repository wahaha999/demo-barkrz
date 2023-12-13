import React from "react";
import { Link } from "react-router-dom";
import './style.scss';


const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link
        className="mail-to"
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    );
};

export default ButtonMailto;