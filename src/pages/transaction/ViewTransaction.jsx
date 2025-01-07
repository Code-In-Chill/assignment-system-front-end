import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/private-route/AuthManagement.jsx";
import {transactionService} from "../../services/transactionService.js";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import DeleteTransactionModal from "../../components/modals/DeleteTransactionModal.jsx";

const AddTransaction = () => {
    const navigate = useNavigate();
    const {transactionId} = useParams(); // Get transaction ID from URL
    const [loading, setLoading] = useState(false);
    const [, user, keycloak] = useContext(AuthContext);
    const [error, setError] = useState(null);

    const [isDeleting, setIsDeleting] = useState(false);

    const [transaction, setTransaction] = useState({
        amount: 5000,
        vehicle: {},
        userId: user?.id,
        category: "",
        paidDate: new Date().toLocaleDateString('sv'), // Set to today
        note: ""
    });

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
                    vehicle: currentTransaction.vehicle,
                    userId: currentTransaction.userId,
                    category: currentTransaction.category,
                    paidDate: currentTransaction.paidDate,
                    note: currentTransaction.note,
                });
            } catch (err) {
                setError("Không thể tải thông tin chi tiêu: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [transactionId, keycloak.token]);

    const handleOpenModal = () => {
        setIsDeleting(true);
    }

    const handleCloseModal = () => {
        setIsDeleting(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await transactionService.deleteTransaction(keycloak.token, transactionId);
            handleCloseModal();
            navigate("/home");
        } catch (error) {
            setError("Có lỗi khi xóa giao dịch: " + error);
        }
    };

    const handleEditTransaction = () => {
        navigate(`/transactions/${transactionId}/edit`);
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (loading) {
        return <LoadingSpinner message="Adding transaction..."/>;
    }

    return (
        <div className={"container mt-2 w-75"}>
            <div className={"add-vehicle-title w-100 d-flex justify-content-between align-items-center mb-3"}>
                <p className={"h3 m-0"}>Chi Tiết Giao Dịch</p>
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

                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h2 className="text-xl-start fw-semibold h4">{transaction.note ? transaction.note : "Không có mô tả"}</h2>
                        <p className="text-secondary mt-1">
                            {
                                new Date(transaction.paidDate)
                                    .toLocaleString('vi-VN', {
                                        dateStyle: 'full',
                                        timeZone: 'Asia/Ho_Chi_Minh',
                                    })
                            }
                        </p>
                    </div>
                    <div className="text-danger text-xxl-start fw-bold h2">
                        {formatCurrency(transaction.amount)}
                    </div>
                </div>

                <hr/>

                <div className="p-6">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="text-sm fw-medium text-secondary h5">Danh mục</h3>
                            <p className="mt-1">{transaction.category}</p>
                        </div>
                        <div className="col-6">
                            <h3 className="text-sm fw-medium text-secondary h5">Xe</h3>
                            <p className="mt-1">
                                {`${transaction.vehicle.brand} - ${transaction.vehicle.model} (${transaction.vehicle.registrationPlate})`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-end gap-2">
                    <button className="btn btn-lg btn-primary col-2"
                            onClick={handleEditTransaction}>
                        Chỉnh Sửa
                    </button>
                    <button className="btn btn-lg btn-danger col-1"
                            onClick={handleOpenModal}>
                        Xóa
                    </button>
                </div>

            </div>

            <DeleteTransactionModal
                isOpen={isDeleting}
                transaction={transaction}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default AddTransaction;