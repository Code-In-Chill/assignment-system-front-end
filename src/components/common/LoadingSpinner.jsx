import 'react';
import PropTypes from "prop-types";

const LoadingSpinner = ({message = "Loading..."}) => {
    return (
        <div className="container card w-50 d-flex flex-column align-items-center justify-content-center mt-5 p-4 shadow-lg">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-4 text-secondary h6">{message}</p>
        </div>
    );
};

LoadingSpinner.propTypes = {
    message: PropTypes.string,
}

export default LoadingSpinner;