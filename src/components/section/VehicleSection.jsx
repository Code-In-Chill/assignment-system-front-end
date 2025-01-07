import VehicleCard from "../card/VehicleCard.jsx";
import CreateVehicleCard from "../card/CreateVehicleCard.jsx";
import PropTypes from "prop-types";

const VehicleSection = ({
                            vehicles,
                            selectedVehicleId,
                            onVehicleSelect,
                            onDeleteVehicle,
                            onEditVehicle
                        }) => (
    <div className="row flex-wrap mb-2 pb-2">
        <VehicleCard
            vehicle={null}
            isSelected={!selectedVehicleId}
            onSelect={() => onVehicleSelect(null)}
        />

        {vehicles.map((vehicle) => (
            <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={selectedVehicleId === vehicle.id}
                onSelect={() => onVehicleSelect(vehicle.id)}
                onDelete={() => onDeleteVehicle(vehicle)}
                onEdit={() => onEditVehicle(vehicle.id)}
            />
        ))}

        <CreateVehicleCard/>
    </div>
);

VehicleSection.propTypes = {
    vehicles: PropTypes.array.isRequired,
    selectedVehicleId: PropTypes.string,
    onVehicleSelect: PropTypes.func.isRequired,
    onDeleteVehicle: PropTypes.func.isRequired,
    onEditVehicle: PropTypes.func.isRequired,
};


export default VehicleSection;