import {useContext} from 'react';
import {AuthContext} from "../components/private-route/AuthManagement.jsx";
import {Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

const RequiredLogin = () => {
    const [authenticated, , keycloak] = useContext(AuthContext);

    if (authenticated) {
        return <Navigate to={"/"}/>
    }

    function redirectToLogin() {
        keycloak.login();
    }

    return (
        <div className="container h-75 d-flex align-items-center justify-content-center mt-5">
            <div className="polygon h-100 d-flex flex-column justify-content-center align-items-center">
                <h1>You must login first!</h1>
                <button className="btn btn-primary btn-lg fs-3" onClick={redirectToLogin}>Redirect To Login</button>
            </div>
        </div>
    );
};

export default RequiredLogin;