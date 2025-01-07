import {useEffect, useState} from "react";

const StatsCard = ({title, value, isMoney = false}) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const duration = 200; // 0.2s
        const steps = 20; // Số bước trong quá trình tăng giá trị
        const increment = value / steps; // Giá trị tăng thêm mỗi bước
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            setDisplayValue((prev) => Math.min(prev + increment, value));
            if (currentStep >= steps) {
                clearInterval(interval);
                setDisplayValue(value); // Đảm bảo dừng ở giá trị cuối cùng
            }
        }, duration / steps);

        return () => clearInterval(interval); // Xóa interval khi component unmount
    }, [value]);

    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const formatNonCurrency = (amount) => {
        return amount.toLocaleString();
    }

    return (
        <div className="col-md-4">
            <div className="card shadow-sm user-select-none">
                <div className="card-body">
                    <h5 className="card-title fs-5">
                        {title}
                    </h5>
                    <p className="card-text fs-3 fw-bold">
                        {isMoney ? formatCurrency(Math.round(displayValue)) : formatNonCurrency(displayValue)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
