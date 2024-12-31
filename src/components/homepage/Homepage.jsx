import 'react';
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import ajax, {METHOD_GET} from "../../services/fetchService.js";
import SpringEndpoint from "../../utils/SpringEndpoint.js";
import {AuthContext} from "../private-route/AuthManagement.jsx";
import {hasAnyRoles, hasRole} from "../../utils/jwt.js";

const Homepage = () => {

    const [, user, keycloak] = useContext(AuthContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (keycloak)
            ajax(SpringEndpoint.publicEndpoint, METHOD_GET, null)
                .then((res) => {
                    setMessage(res.message);
                })
    }, []);

    return (
        <div className={"Homepage"}>
            <div className="polygon">

                {!user &&
                    <h1>Welcome to Assignment System</h1>
                }
                {user &&
                    <h1>Welcome back, <u>{user.firstName + " " + user.lastName}</u></h1>
                }
                <h3>{message}</h3>
                {keycloak.authenticated && hasAnyRoles(["teacher", "admin"], keycloak.token) &&
                    <h3><Link to={"/teacher-dashboard"}>Click here to go to the teacher dashboard</Link></h3>
                }

                {keycloak.authenticated && hasRole("admin", keycloak.token) &&
                    <h3><Link to={"/admin-dashboard"}>Click here to go to the admin dashboard</Link></h3>
                }
            </div>
        </div>
    );
};

export default Homepage;