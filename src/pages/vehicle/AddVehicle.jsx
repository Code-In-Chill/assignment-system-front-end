import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {vehicleService} from "../../services/vehicleService.js";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import {AuthContext} from "../../components/private-route/AuthManagement.jsx";

const AddVehicle = () => {
    const [loading, setLoading] = useState(false);
    const [, , keycloak] = useContext(AuthContext);
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({brand: "", model: "", registrationPlate: ""});
    const [error, setError] = useState(null);

    function handleChange(event) {
        const {id, value} = event.target;
        setVehicle(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        // Basic validation
        if (!vehicle.brand || !vehicle.model || !vehicle.registrationPlate) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await vehicleService.addVehicle(keycloak.token, vehicle);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return <LoadingSpinner message="Adding vehicle..." />;
    }

    return (
        <div className={"container mt-2 w-75"}>
            <div className={"add-vehicle-title w-100 d-flex justify-content-between align-items-center mb-3"}>
                <p className={"h3 m-0"}>Thêm Phương Tiện Mới</p>
                <Link className={"h5 m-0 text-decoration-none hover"} to={"/home"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-left-circle-fill me-1" viewBox="0 0 16 16">
                        <path
                            d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                    </svg>
                    Quay Lại</Link>
            </div>
            <div className={"bg-white rounded-3 p-4"}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-floating mb-3">
                    <input type="text" className="form-control form-control-lg" id="brand"
                           placeholder="Vd: Honda, BMW,..."
                           value={vehicle.brand} onChange={handleChange}/>
                    <label htmlFor="brand">Hãng Xe (Vd: Honda, BMW,...)</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control form-control-lg" id="model"
                           placeholder="Vd: Civic, CR-V,..."
                           value={vehicle.model} onChange={handleChange}/>
                    <label htmlFor="model">Mẫu Xe (Vd: Civic, CR-V,...)</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control form-control-lg" id="registrationPlate"
                           placeholder="Vd: 12A-12345"
                           value={vehicle.registrationPlate} onChange={handleChange}/>
                    <label htmlFor="registrationPlate">Biển Số Xe (Vd: 12A-12345)</label>
                </div>
                <button className="btn btn-lg btn-primary"
                        onClick={handleSubmit}>
                    Thêm Phương Tiện
                </button>
            </div>
        </div>
    );
};

export default AddVehicle;