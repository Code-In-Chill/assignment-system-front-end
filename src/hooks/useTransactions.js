import { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';

const useTransactions = (token) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await transactionService.getAllTransactions(token);
            setTransactions(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
    }, [token]);

    return {
        transactions,
        loading,
        error,
        reloadTransactions: loadTransactions
    };
};

export default useTransactions;