export default class SpringEndpoint {

    static host = "http://localhost:9789";
    static api_prefix = "/api/keycloak-demo";

    static adminEndpoint = this.host + this.api_prefix + "/admin-only";

    static teacherEndpoint = this.host + this.api_prefix + "/teacher-and-admin";

    static protectedEndpoint = this.host + this.api_prefix + "/has-any-role";

    static publicEndpoint = this.host + this.api_prefix + "/public-endpoint";
}