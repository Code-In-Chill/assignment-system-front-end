import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import AuthManagement from "./components/private-route/AuthManagement.jsx";
import keycloak, {isKeycloakCallback} from "./keycloak.js";


// Khởi tạo Keycloak
keycloak
    .init({
        onLoad: isKeycloakCallback() ? undefined : "check-sso",
        pkceMethod: 'S256',
        redirectUri: window.location.origin + window.location.pathname // Chỉ lấy URL cơ bản (không query string)
    })
    .then(authenticated => {
        if (authenticated) {
            console.log("Authenticated:", authenticated);
        } else {
            console.log("Not authenticated");
        }

        createRoot(document.getElementById('root')).render(
            <BrowserRouter>
                <AuthManagement>
                    <App/>
                </AuthManagement>
            </BrowserRouter>
        )
    })
    .catch(err => {
        console.error("Keycloak initialization error:", err);
    });
