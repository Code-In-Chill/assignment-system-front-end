import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { vehicleService } from "../../services/vehicleService.js";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import { AuthContext } from "../../components/private-route/AuthManagement.jsx";

const EditVehicle = () => {
    const { vehicleId } = useParams(); // Get vehicle ID from URL
    const [loading, setLoading] = useState(true);
    const [, , keycloak] = useContext(AuthContext);
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState({
        brand: "",
        model: "",
        registrationPlate: ""
    });
    const [error, setError] = useState(null);

    // Fetch vehicle data when component mounts
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const vehicles = await vehicleService.getAllVehicles(keycloak.token);
                const currentVehicle = vehicles.find(v => v.id === vehicleId);

                if (!currentVehicle) {
                    setError("Không tìm thấy thông tin xe");
                    return;
                }

                setVehicle({
                    brand: currentVehicle.brand,
                    model: currentVehicle.model,
                    registrationPlate: currentVehicle.registrationPlate
                });
            } catch (err) {
                setError("Không thể tải thông tin xe: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [vehicleId, keycloak.token]);

    function handleChange(event) {
        const { id, value } = event.target;
        setVehicle(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        // Validation
        if (!vehicle.brand || !vehicle.model || !vehicle.registrationPlate) {
            setError("Vui lòng điền đầy đủ thông tin");
            setLoading(false);
            return;
        }

        try {
            await vehicleService.updateVehicle(keycloak.token, vehicleId, vehicle);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingSpinner message="Đang xử lý..." />;
    }

    return (
        <div className="container mt-2 w-75">
            <div className="add-vehicle-title w-100 d-flex justify-content-between align-items-center mb-3">
                <p className="h3 m-0">Chỉnh Sửa Thông Tin Xe</p>
                <Link className="h5 m-0 text-decoration-none hover" to="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-left-circle-fill me-1" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                    </svg>
                    Quay Lại
                </Link>
            </div>
            <div className="bg-white rounded-3 p-4">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="brand"
                        placeholder="Vd: Honda, BMW,..."
                        value={vehicle.brand}
                        onChange={handleChange}
                    />
                    <label htmlFor="brand">Hãng Xe (Vd: Honda, BMW,...)</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="model"
                        placeholder="Vd: Civic, CR-V,..."
                        value={vehicle.model}
                        onChange={handleChange}
                    />
                    <label htmlFor="model">Mẫu Xe (Vd: Civic, CR-V,...)</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        id="registrationPlate"
                        placeholder="Vd: 12A-12345"
                        value={vehicle.registrationPlate}
                        onChange={handleChange}
                    />
                    <label htmlFor="registrationPlate">Biển Số Xe (Vd: 12A-12345)</label>
                </div>

                <button
                    className="btn btn-lg btn-primary"
                    onClick={handleSubmit}
                >
                    Cập Nhật Thông Tin
                </button>
            </div>
        </div>
    );
};

export default EditVehicle;