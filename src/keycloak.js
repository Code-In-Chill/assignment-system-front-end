import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    realm: "car-transaction-management",
    clientId: "ctm-react",
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
});

// Kiểm tra xem có callback từ Keycloak trong URL không
export const isKeycloakCallback = () => {
    const params = new URLSearchParams(window.location.search);
    return params.has("code") || params.has("state") || params.has("session_state");
};

export default keycloak;
