import 'react';
import PropTypes from "prop-types";

const LoadingSpinner = ({message = "Loading..."}) => {
    return (
        <div className="w-100 min-h-[200px] flex flex-col items-center justify-center">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
            <p className="mt-4 text-gray-600">{message}</p>
        </div>
    );
};

LoadingSpinner.propTypes = {
    message: PropTypes.string,
}

export default LoadingSpinner;