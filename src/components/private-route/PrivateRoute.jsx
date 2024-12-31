import { useContext } from 'react';
import {AuthContext} from "./AuthManagement.jsx";

const PrivateRoute = ({ children }) => {
    const [authenticated, , keycloak] = useContext(AuthContext);

    return (authenticated) ? children : keycloak.login();
};

export default PrivateRoute;
