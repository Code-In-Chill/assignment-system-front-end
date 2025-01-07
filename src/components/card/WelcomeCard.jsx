import 'react';
import PropTypes from "prop-types";

const WelcomeCard = ({ onAddVehicle }) => (
    <div className="container mt-2 w-75">
        <div className="card bg-light">
            <div className="card-body text-center py-5">
                <h3 className="card-title mb-4">
                    Chào mừng bạn đến với ứng dụng quản lý chi phí xe
                </h3>
                <p className="card-text fs-5 mb-4">
                    Để bắt đầu sử dụng, vui lòng thêm phương tiện đầu tiên của bạn
                </p>
                <button className="btn btn-primary btn-lg" onClick={onAddVehicle}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Thêm Phương Tiện
                </button>
            </div>
        </div>
    </div>
);

WelcomeCard.propTypes = {
    onAddVehicle: PropTypes.func.isRequired,
}

export default WelcomeCard;