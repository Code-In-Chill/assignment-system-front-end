import {useContext} from 'react';
import {AuthContext} from "../components/private-route/AuthManagement.jsx";
import {Navigate, useParams} from "react-router-dom";
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
        <div className="RequiredLogin">
            <div className="polygon">
                <h1>You must login first!</h1>
                <button className="btn btn-primary btn-lg fs-3" onClick={redirectToLogin}>Redirect To Login</button>
            </div>
        </div>
    );
};

export default RequiredLogin;