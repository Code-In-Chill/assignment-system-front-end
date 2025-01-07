import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {vehicleService} from '../services/vehicleService';

const useVehicles = (token) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedVehicleId = searchParams.get("vehicle");

    const loadVehicles = async () => {
        try {
            setLoading(true);
            const data = await vehicleService.getAllVehicles(token);
            setVehicles(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVehicleSelect = (vehicleId) => {
        if (vehicleId) {
            setSearchParams({vehicle: vehicleId});
        } else {
            setSearchParams({});
        }
    };

    const deleteVehicle = async (vehicleId) => {
        await vehicleService.deleteVehicle(token, vehicleId);
        if (selectedVehicleId === vehicleId) {
            setSearchParams({});
        }
        await loadVehicles();
        return true;
    };

    useEffect(() => {
        loadVehicles();
    }, [token]);

    return {
        vehicles,
        loading,
        error,
        deleteVehicle,
        selectedVehicleId,
        handleVehicleSelect,
        reloadVehicles: loadVehicles
    };
};

export default useVehicles;