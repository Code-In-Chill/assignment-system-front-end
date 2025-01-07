import { useState, useEffect } from 'react';

const useStats = (transactions, selectedVehicleId) => {
    const [stats, setStats] = useState({
        totalExpense: 0,
        monthlyExpense: 0,
        transactionCount: 0,
    });

    useEffect(() => {
        if (!transactions.length) {
            setStats({
                totalExpense: 0,
                monthlyExpense: 0,
                transactionCount: 0,
            });
            return;
        }

        const filteredTransactions = selectedVehicleId
            ? transactions.filter(t => t.vehicle.id === selectedVehicleId)
            : transactions;

        const totalExpense = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyExpense = filteredTransactions
            .filter(t => {
                const date = new Date(t.paidDate);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + t.amount, 0);

        setStats({
            totalExpense,
            monthlyExpense,
            transactionCount: filteredTransactions.length,
        });
    }, [selectedVehicleId, transactions]);

    return stats;
};

export default useStats;