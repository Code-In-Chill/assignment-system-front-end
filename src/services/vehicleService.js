import ajax, {METHOD_GET, METHOD_POST, METHOD_PUT, METHOD_DELETE} from "./fetchService.js";
import {vehicle_endpoint} from "../utils/SpringEndpoint.js";
export const vehicleService = {
    async getAllVehicles(token) {
        return ajax(vehicle_endpoint.get_all, METHOD_GET, token);
    },

    async addVehicle(token, vehicleData) {
        return ajax(vehicle_endpoint.create, METHOD_PUT, token, vehicleData);
    },

    async updateVehicle(token, id, vehicleData) {
        return ajax(`${vehicle_endpoint.update}/${id}`, METHOD_POST, token, vehicleData);
    },

    async deleteVehicle(token, id) {
        return ajax(`${vehicle_endpoint.delete}/${id}`, METHOD_DELETE, token)
            .then(() => true);
    },
};