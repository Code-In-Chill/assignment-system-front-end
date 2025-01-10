import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../components/private-route/AuthManagement.jsx";
import Toast from "../components/toast/Toast.jsx";
import WelcomeCard from "../components/card/WelcomeCard.jsx";
import useStats from "../hooks/useStats.js";
import useToast from "../hooks/useToast.js";
import useTransactions from "../hooks/useTransactions.js";
import useVehicles from "../hooks/useVehicles.js";
import ErrorAlert from "../components/common/ErrorAlert.jsx";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import StatsSection from "../components/section/StatsSection.jsx";
import VehicleSection from "../components/section/VehicleSection.jsx";
import TransactionsSection from "../components/section/TransactionSection.jsx";
import DeleteVehicleModal from "../components/modals/DeleteVehicleModal.jsx";

const Homepage = () => {
    const [, , keycloak] = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        vehicles,
        loading: vehiclesLoading,
        error: vehiclesError,
        deleteVehicle,
        selectedVehicleId,
        handleVehicleSelect,
        reloadVehicles
    } = useVehicles(keycloak.token);

    const {
        transactions,
        loading: transactionsLoading,
        error: transactionsError,
        reloadTransactions
    } = useTransactions(keycloak.token);

    const {toast, showToast, hideToast} = useToast();
    const stats = useStats(transactions, selectedVehicleId);

    const loading = vehiclesLoading || transactionsLoading;
    const error = vehiclesError || transactionsError;

    const [vehicleToDelete, setVehicleToDelete] = useState(null);

    const handleDeleteVehicle = (vehicle) => {
        setVehicleToDelete(vehicle);
    };

    const handleCloseModal = () => {
        setVehicleToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteVehicle(vehicleToDelete.id);
            await Promise.all([reloadVehicles(), reloadTransactions()]);
            showToast('Xóa xe thành công');
            handleCloseModal();
        } catch (error) {
            showToast('Xóa xe thất bại:' + error, 'error');
        }
    };

    if (loading)
        return <LoadingSpinner/>;
    if (error)
        return <ErrorAlert error={error} onRetry={reloadVehicles}/>;
    if (vehicles.length === 0)
        return <WelcomeCard onAddVehicle={() => navigate("/add-vehicle")}/>;

    return (
        <div className="container mt-2 w-75">
            <StatsSection stats={stats}/>

            <VehicleSection
                vehicles={vehicles}
                selectedVehicleId={selectedVehicleId}
                onVehicleSelect={handleVehicleSelect}
                onDeleteVehicle={handleDeleteVehicle}
                onEditVehicle={(id) => navigate(`/vehicles/${id}/edit`)}
            />

            {(vehicles.length > 0 && stats.transactionCount === 0) && (
                <div className="card bg-primary-subtle">
                    <div className="card-body">
                        <h5 className="card-title">Bạn chưa có giao dịch nào</h5>
                        <p className="card-text">Hãy thêm một giao dịch mới</p>
                        <button
                            className="btn btn-lg btn-primary"
                            onClick={() => navigate("/add-transaction")}
                        >
                            Thêm Giao Dịch
                        </button>
                    </div>
                </div>
            )}

            {/*Show transactions*/}
            {!(vehicles.length > 0 && stats.transactionCount === 0) && (
                <TransactionsSection
                    vehicles={vehicles}
                    transactions={transactions}
                    selectedVehicleId={selectedVehicleId}
                    onAddTransaction={() => navigate("/add-transaction")}
                    onExportReport={() => navigate("/export-report")}
                />
            )}

            {/* Bootstrap Modal for Delete Confirmation */}
            <DeleteVehicleModal
                isOpen={vehicleToDelete !== null}
                vehicle={vehicleToDelete}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />

            {/* Toast display*/}
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => hideToast}
                />
            )}
        </div>
    );
};

export default Homepage;