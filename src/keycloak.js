import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    realm: "Assignment",
    clientId: "assignment-system-react"
});

// Khởi tạo Keycloak với cấu hình `check-sso`
keycloak
    .init({
        onLoad: "check-sso",
        pkceMethod: 'S256',
        redirectUri: window.location.origin
    })
    .then(authenticated => {
        if (authenticated) {
            console.log("Authenticated:", authenticated);
        } else {
            console.log("Not authenticated");
        }
    })
    .catch(err => {
        console.error("Keycloak initialization error:", err);
    });
export default keycloak;