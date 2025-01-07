import PropTypes from "prop-types";

const ErrorAlert = ({ error, onRetry }) => (
    <div className="container mt-2 w-75">
        <div className="alert alert-danger" role="alert">
            {error}
            <button className="btn btn-outline-danger ms-3" onClick={onRetry}>
                Retry
            </button>
        </div>
    </div>
);

ErrorAlert.propTypes = {
    error: PropTypes.object.isRequired,
    onRetry: PropTypes.func.isRequired,
}

export default ErrorAlert;