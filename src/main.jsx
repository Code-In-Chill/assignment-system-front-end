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
        createRoot(document.getElementById('root')).render(
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">
                        Có Vấn Đề Xảy Ra Trong Quá Trình Xác Thực
                    </h4>
                    <p>Chúng tôi đang gặp vấn đề khi kết nối đến dịch vụ xác thực. Bạn có thể:</p>
                    <hr/>
                    <p className="mb-0">
                        - Kiểm tra lại kết nối internet<br/>
                        - Tải lại trang<br/>
                        - Thử truy cập lại sau ít phút
                    </p>
                </div>
            </div>
        )
        console.error("Keycloak initialization error:", err);
    });
