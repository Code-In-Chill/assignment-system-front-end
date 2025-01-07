import {useContext} from 'react';
import {AuthContext} from "./AuthManagement.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const [authenticated] = useContext(AuthContext);

    // Đợi Keycloak khởi tạo xong trước khi quyết định điều hướng
    if (authenticated === undefined) {
        return <div>Loading...</div>; // Tránh redirect trước khi Keycloak xác thực xong
    }

    return (authenticated) ? children : <Navigate to={"/login-required"}/>;
};

export default PrivateRoute;
