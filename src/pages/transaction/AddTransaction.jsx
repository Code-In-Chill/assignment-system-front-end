import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/private-route/AuthManagement.jsx";
import {vehicleService} from "../../services/vehicleService.js";
import {transactionService} from "../../services/transactionService.js";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import {categories} from "./category.js";

const AddTransaction = () => {
    const [loading, setLoading] = useState(false);
    const [, user, keycloak] = useContext(AuthContext);
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(null);
    const [transaction, setTransaction] = useState({
        amount: 0,
        carId: "",
        userId: user?.id,
        category: "",
        paidDate: new Date().toLocaleDateString('sv'), // Set to today
        note: ""
    });

    useEffect(() => {
        loadVehicles();
    }, []);

    async function loadVehicles() {
        try {
            const data = await vehicleService.getAllVehicles(keycloak.token);
            setVehicles(data);
        } catch (err) {
            setError("Failed to load vehicles: " + err.message);
        }
    }

    function handleChange(event) {
        const {id, value} = event.target;
        setTransaction(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        // Validation
        if (!transaction.amount || !transaction.carId || !transaction.category || !transaction.paidDate) {
            setError("Please fill in all required fields");
            return;
        }

        if (transaction.amount <= 0) {
            setError("Amount must be greater than 0");
            return;
        }

        try {
            const transactionData = {
                ...transaction,
                amount: Number(transaction.amount)
            };

            await transactionService.addTransaction(keycloak.token, transactionData)
            navigate("/home");
        } catch (err) {
            setError("Failed to add transaction: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingSpinner message="Adding transaction..."/>;
    }

    return (
        <div className={"container mt-2 w-75"}>
            <div className={"add-vehicle-title w-100 d-flex justify-content-between align-items-center mb-3"}>
                <p className={"h3 m-0"}>Thêm Giao Dịch Mới</p>
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

                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text w-25" htmlFor="amount">Số Tiền Chi Tiêu *</label>
                    <input type="number" className="form-control form-control-lg" id="amount"
                           value={transaction.amount} onChange={handleChange} required/>
                </div>

                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text w-25" htmlFor="carId">Chi Tiêu Cho Xe *</label>
                    <select
                        className="form-select"
                        id="carId"
                        value={transaction.carId}
                        onChange={handleChange}
                        required
                    >
                        <option defaultValue>Chọn xe</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id}
                                    value={vehicle.id}>{`${vehicle.brand}-${vehicle.model} (${vehicle.registrationPlate})`}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text w-25" htmlFor="category">Danh Mục Chi Tiêu *</label>
                    <select
                        className="form-select"
                        id="category"
                        value={transaction.category}
                        onChange={handleChange}
                        required>
                        <option defaultValue>Chọn Danh Mục</option>
                        {categories.map((category) => (
                            <option key={category.id}
                                    value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text w-25" htmlFor="paidDate">Ngày Chi Tiêu *</label>
                    <input type="date" className="form-control form-control-lg" id="paidDate"
                           value={transaction.paidDate} onChange={handleChange} required/>
                </div>

                <div className="input-group input-group-lg mb-3">
                    <span className="input-group-text w-25">Ghi Chú</span>
                    <textarea
                        className="form-control form-control-lg"
                        aria-label="With textarea"
                        id="note"
                        value={transaction.note}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-lg btn-primary"
                        onClick={handleSubmit}>
                    Thêm Giao Dịch
                </button>
            </div>
        </div>
    );
};

export default AddTransaction;