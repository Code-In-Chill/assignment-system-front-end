import PropTypes from 'prop-types';
import TransactionList from "../card/TransactionList.jsx";

const TransactionsSection = ({
                                 vehicles,
                                 transactions,
                                 selectedVehicleId,
                                 onAddTransaction
                             }) => {

    if (vehicles.length === 0 || transactions.length === 0) {
        return (
            <div className="card bg-primary-subtle">
                <div className="card-body">
                    <h5 className="card-title">Bạn chưa có giao dịch nào</h5>
                    <p className="card-text">Hãy thêm một giao dịch mới</p>
                    <button
                        className="btn btn-lg btn-primary"
                        onClick={onAddTransaction}
                    >
                        Thêm Giao Dịch
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container w-100 rounded-3 shadow-lg card">
            <div className="card-title pt-2 mb-1 row justify-content-between">
                <p className="fw-bold h5 mb-0 w-auto">Chi Tiêu Gần Đây</p>
                <div className="w-auto">
                    <button
                        onClick={onAddTransaction}
                        className="btn btn-primary"
                    >
                        Thêm Giao Dịch Mới
                    </button>
                </div>
            </div>
            <TransactionList
                transactions={transactions}
                selectedVehicleId={selectedVehicleId}
            />
        </div>
    );
};

TransactionsSection.propTypes = {
    vehicles: PropTypes.array.isRequired,
    transactions: PropTypes.array.isRequired,
    selectedVehicleId: PropTypes.string,
    onAddTransaction: PropTypes.func.isRequired
};

export default TransactionsSection;