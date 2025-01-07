import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {vehicleService} from "../../services/vehicleService.js";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import {AuthContext} from "../../components/private-route/AuthManagement.jsx";
import {transactionService} from "../../services/transactionService.js";
import {categories} from "./category.js";

const EditTransaction = () => {
    const navigate = useNavigate();
    const {transactionId} = useParams(); // Get transaction ID from URL
    const [loading, setLoading] = useState(false);
    const [, user, keycloak] = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [transaction, setTransaction] = useState({
        amount: 0,
        carId: "",
        userId: user?.id,
        category: "",
        paidDate: new Date().toLocaleDateString('sv'), // Set to today
        note: ""
    });
    const [vehicleData, setVehicleData] = useState({});

    // Fetch transaction data when component mounts
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const transactions = await transactionService.getAllTransactions(keycloak.token);
                const currentTransaction = transactions.find(t => t.id === transactionId);

                if (!currentTransaction) {
                    setError("Không tìm thấy thông tin chi tiêu");
                    return;
                }

                setTransaction({
                    amount: currentTransaction.amount,
                    carId: currentTransaction.vehicle.id,
                    userId: currentTransaction.userId,
                    category: currentTransaction.category,
                    paidDate: currentTransaction.paidDate,
                    note: currentTransaction.note,
                });
                setVehicleData(currentTransaction.vehicle);
            } catch (err) {
                setError("Không thể tải thông tin chi tiêu: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [transactionId, keycloak.token]);

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
            setError("Hãy nhập đầy đủ các trường cần thiết");
            return;
        }

        if (transaction.amount <= 0) {
            setError("Số tiền phải lớn hơn 0");
            return;
        }

        try {
            const transactionData = {
                ...transaction,
                amount: Number(transaction.amount)
            };

            await transactionService.updateTransaction(keycloak.token, transactionId, transactionData)
            navigate(`/transactions/${transactionId}`);
        } catch (err) {
            setError("Lỗi khi cập nhật giao dịch: " + err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleCancel() {
        setError(null);
        setLoading(false);
        navigate(`/transactions/${transactionId}`);
    }

    if (loading) {
        return <LoadingSpinner message="Đang cập nhật giao dịch..."/>;
    }

    return (
        <div className={"container mt-2 w-75"}>
            <div className={"add-vehicle-title w-100 d-flex justify-content-between align-items-center mb-3"}>
                <p className={"h3 m-0"}>Chỉnh Sửa Giao Dịch</p>
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
                    <label className="input-group-text w-25" htmlFor="vehicle">Chi Tiêu Cho Xe *</label>
                    <input type="text"
                           className="form-control form-control-lg"
                           id="vehicle"
                           value={`${vehicleData.brand}-${vehicleData.model} (${vehicleData.registrationPlate})`}
                           required
                           disabled
                    />
                </div>

                <div className="input-group input-group-lg mb-3">
                    <label className="input-group-text w-25" htmlFor="category">Danh Mục Chi Tiêu *</label>
                    <select
                        className="form-select"
                        id="category"
                        value={transaction.category}
                        onChange={handleChange}
                        required>
                        <option value="">Chọn Danh Mục</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
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

                <div className="row justify-content-end gap-2 me-1">
                    <button className="btn btn-lg btn-primary col-2"
                            onClick={handleSubmit}>
                        Chỉnh Sửa
                    </button>
                    <button className="btn btn-lg btn-danger col-1"
                            onClick={handleCancel}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTransaction;