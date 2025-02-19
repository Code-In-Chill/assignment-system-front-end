import "./card.css";

const VehicleCard = ({vehicle, isSelected, onSelect, onEdit, onDelete}) => {
    const isAllVehicleButton = !vehicle;

    function handleVehicleSelected(e) {
        e.preventDefault();
        onSelect();
    }

    function handleEditVehicle(e) {
        e.stopPropagation();
        if (onEdit) onEdit();
    }

    function handleDeleteVehicle(e) {
        e.stopPropagation();
        if (onDelete) onDelete();
    }

    return (
        <div
            className={`VehicleCard col-sm-2`}
            onClick={(e) => handleVehicleSelected(e)}
        >
            <div className={`card cursor-pointer h-100 ${isSelected ? "border-primary shadow" : ""}`}>
                {isAllVehicleButton ? (
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <p className="fw-bold fs-5 mb-0">Tất Cả Xe</p>
                    </div>
                ) : (
                    <div className="card-body p-2">
                        <div className="d-flex justify-content-between">
                            <div className="vehicle-info flex-grow-1">
                                <div className="vehicle-name mb-0">
                                    {vehicle.brand}
                                </div>
                                <div className="vehicle-name mb-0">
                                    {vehicle.model}
                                </div>
                                <div className="vehicle-plate fw-bold text-secondary">
                                    {vehicle.registrationPlate}
                                </div>
                            </div>
                            <div className="vehicle-actions d-flex flex-column justify-content-center gap-2">
                                <button
                                    className="btn btn-primary btn-sm btn-tooltip p-1"
                                    onClick={handleEditVehicle}
                                >
                                    <span className="tooltiptext">Edit</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>
                                <button
                                    className="btn btn-danger btn-sm btn-tooltip p-1"
                                    onClick={handleDeleteVehicle}
                                >
                                    <span className="tooltiptext">Delete</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehicleCard;