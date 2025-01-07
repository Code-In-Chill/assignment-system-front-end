import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

const TransactionList = ({transactions, selectedVehicleId}) => {
    const navigate = useNavigate();

    // Format currency helper function
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Filter and sort transactions
    const filteredAndSortedTransactions = [...transactions]
        .filter(t => !selectedVehicleId || t.vehicle.id === selectedVehicleId)
        .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));

    return (
        <div className="transaction-list">
            {filteredAndSortedTransactions.map(transaction => (
                <div
                    key={transaction.id}
                    onClick={() => navigate("/transactions/" + transaction.id)}
                    className="bg-white row mb-2 cursor-pointer"
                >
                    <div className="col-6 d-flex flex-column align-items-start">
                        <p className="fw-bold m-0">
                            {transaction.category}
                        </p>
                        <p className="text-secondary m-0">
                            {new Date(transaction.paidDate).toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                    <div className="col-6 align-items-end">
                        <p className="text-danger text-end">
                            {formatCurrency(transaction.amount)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

TransactionList.propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        paidDate: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        vehicle: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    })).isRequired,
    selectedVehicleId: PropTypes.string
};

export default TransactionList;