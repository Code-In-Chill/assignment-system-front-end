import {createContext, useEffect, useState} from 'react';
import keycloak from "../../keycloak.js";
import PropTypes from "prop-types";
import {getRolesArray} from "../../utils/jwt.js";

export const AuthContext = createContext();

const AuthManagement = ({children}) => {
    const [authenticated, setAuthenticated] = useState(keycloak.authenticated);
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const updateAuthState = () => {
            setAuthenticated(keycloak.authenticated);
            if (keycloak.authenticated) {
                keycloak.loadUserProfile().then(userProfile => {
                    setUser(userProfile);
                });
                setRoles(getRolesArray(keycloak.token))
            } else {
                setUser(null);
                setRoles([])
            }
        };

        keycloak.onAuthSuccess = updateAuthState;
        keycloak.onAuthLogout = updateAuthState;
        keycloak.onTokenExpired = () => keycloak.updateToken(30);

        updateAuthState();
    }, []);

    return (
        <AuthContext.Provider value={[authenticated, user, keycloak, setUser, roles]}>
            {children}
        </AuthContext.Provider>
    );
};

AuthManagement.propTypes = {
    children: PropTypes.element.isRequired
};

export default AuthManagement;
