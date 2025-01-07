export default class SpringEndpoint {
    static host = "http://localhost:10000";
    static api_prefix = "/api/v1";
}

export const vehicle_endpoint = {
    get_all: SpringEndpoint.host + SpringEndpoint.api_prefix + "/vehicles",
    get_by_id: SpringEndpoint.host + SpringEndpoint.api_prefix + "/vehicles/:id",
    create: SpringEndpoint.host + SpringEndpoint.api_prefix + "/vehicles/create",
    update: SpringEndpoint.host + SpringEndpoint.api_prefix + "/vehicles/update",
    delete: SpringEndpoint.host + SpringEndpoint.api_prefix + "/vehicles/delete",
}

export const transaction_endpoint = {
    get_all: SpringEndpoint.host + SpringEndpoint.api_prefix + "/transactions",
    get_by_id: SpringEndpoint.host + SpringEndpoint.api_prefix + "/transactions/:id",
    create: SpringEndpoint.host + SpringEndpoint.api_prefix + "/transactions/create",
    update: SpringEndpoint.host + SpringEndpoint.api_prefix + "/transactions/update",
    delete: SpringEndpoint.host + SpringEndpoint.api_prefix + "/transactions/delete",
}