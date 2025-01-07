import PropTypes from 'prop-types';

const DeleteVehicleModal = ({ isOpen, vehicle, onClose, onConfirm }) => {
    return (
        <>
            <div
                className={`modal fade ${isOpen ? 'show' : ''}`}
                style={{display: isOpen ? 'block' : 'none'}}
                tabIndex="-1"
                role="dialog"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
                aria-hidden={!isOpen}
            >
                <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Xác nhận xóa xe</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            {vehicle &&
                                `Bạn có chắc chắn muốn xóa xe ${vehicle.brand} ${vehicle.model} (${vehicle.registrationPlate})?`
                            }
                            <p>Hành động này không thể hoàn tác.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={onConfirm}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className="modal-backdrop fade show"
                    onClick={onClose}
                />
            )}
        </>
    );
};

DeleteVehicleModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    vehicle: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default DeleteVehicleModal;