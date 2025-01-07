import {createContext, useEffect, useState} from 'react';
import keycloak, {isKeycloakCallback} from "../../keycloak.js";
import PropTypes from "prop-types";
import {getRolesArray} from "../../utils/jwt.js";
import useLocalStorage from "../../utils/useLocalStorage.js";

export const AuthContext = createContext();

const AuthManagement = ({children}) => {
    const [authenticated, setAuthenticated] = useState(keycloak.authenticated);
    const [user, setUser] = useLocalStorage({}, "user");
    const [roles, setRoles] = useLocalStorage([], "roles");

    useEffect(() => {
        const updateAuthState = async () => {
            setAuthenticated(keycloak.authenticated);
            if (keycloak.authenticated) {
                const userProfile = await keycloak.loadUserProfile();
                setUser(userProfile);
                setRoles(getRolesArray(keycloak.token));
            } else {
                setUser(null);
                setRoles([]);
            }
        };

        // Chỉ cập nhật trạng thái nếu không phải callback
        if (!isKeycloakCallback()) {
            updateAuthState();
        }

        keycloak.onAuthSuccess = updateAuthState;
        keycloak.onAuthLogout = updateAuthState;
        keycloak.onTokenExpired = () => keycloak.updateToken(30);
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
