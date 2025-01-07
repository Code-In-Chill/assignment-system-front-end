import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';

const DeleteTransactionModal = ({isOpen, transaction, onClose, onConfirm}) => {
    const modalRef = useRef(null);
    const confirmButtonRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            confirmButtonRef.current?.focus();

            // Handle escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="modal fade show"
                style={{display: 'block'}}
                tabIndex="-1"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
                ref={modalRef}
            >
                <div
                    className="modal-dialog"
                    onClick={(e) => e.stopPropagation()}
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal-title">
                                Xác nhận xóa giao dịch
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Đóng"
                            />
                        </div>
                        <div className="modal-body">
                            {transaction && (
                                <div>
                                    <p>Bạn có chắc chắn muốn xóa giao dịch này?</p>
                                    <ul className="list-unstyled">
                                        <li><strong>Loại:</strong> {transaction.category}</li>
                                        <li><strong>Số tiền:</strong> {transaction.amount?.toLocaleString('vi-VN')} VNĐ
                                        </li>
                                        <li><strong>Ngày:</strong> {
                                            new Date(transaction.paidDate)
                                                .toLocaleString('vi-VN', {
                                                    dateStyle: 'full',
                                                    timeZone: 'Asia/Ho_Chi_Minh',
                                                })
                                        }</li>
                                        {transaction.note && <li><strong>Ghi chú:</strong> {transaction.note}</li>}
                                    </ul>
                                </div>
                            )}
                            <p className="text-danger">Hành động này không thể hoàn tác.</p>
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
                                ref={confirmButtonRef}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"/>
        </>
    );
};

DeleteTransactionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    transaction: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default DeleteTransactionModal;