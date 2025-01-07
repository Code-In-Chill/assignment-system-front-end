// components/Toast.jsx
import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        // Cleanup timer khi component unmount
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`toast show position-fixed bottom-0 end-0 m-3 bg-${type === 'success' ? 'success' : 'danger'} text-white`}
            role="alert"
            style={{ zIndex: 1050 }}
        >
            <div className="toast-header">
                <strong className="me-auto">{type === 'success' ? 'Thành công' : 'Lỗi'}</strong>
                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                ></button>
            </div>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default Toast;