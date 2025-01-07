import { useState } from 'react';

const useToast = () => {
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success',
        duration: 3000
    });

    const showToast = (message, type = 'success', duration = 3000) => {
        setToast({
            show: true,
            message,
            type,
            duration
        });
    };

    const hideToast = () => {
        setToast({
            show: false,
            message: '',
            type: 'info',
            duration: 3000
        })
    }

    return { toast, showToast, hideToast };
};

export default useToast;