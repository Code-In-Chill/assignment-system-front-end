import StatsCard from "../card/StatsCard.jsx";

const StatsSection = ({ stats }) => (
    <div className="row mb-4">
        <StatsCard title="Tổng chi phí" value={stats.totalExpense} isMoney={true} />
        <StatsCard title="Chi phí tháng này" value={stats.monthlyExpense} isMoney={true} />
        <StatsCard title="Số giao dịch" value={stats.transactionCount} isMoney={false} />
    </div>
);

export default StatsSection;