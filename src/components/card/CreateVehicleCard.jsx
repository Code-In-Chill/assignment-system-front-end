import 'react';
import {Link} from "react-router-dom";

const CreateVehicleCard = () => {
    return (
        <div className="col-sm-2 mb-3">
            <Link to={"/add-vehicle"}
                  className="btn btn-outline-primary w-100 h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                            <span className="fs-5 fw-semibold">
                                + Thêm xe
                            </span>
                </div>
            </Link>
        </div>
    );
};

export default CreateVehicleCard;