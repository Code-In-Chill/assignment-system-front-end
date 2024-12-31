import 'react';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../private-route/AuthManagement.jsx";
import ajax, {METHOD_GET} from "../../services/fetchService.js";
import SpringEndpoint from "../../utils/SpringEndpoint.js";
import {hasAnyRoles, hasRole} from "../../utils/jwt.js";
import {Link} from "react-router-dom";

const TeacherDashboard = () => {
    const [, , keycloak] = useContext(AuthContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (keycloak)
            ajax(SpringEndpoint.protectedEndpoint, METHOD_GET, keycloak.token)
                .then((res) => {
                    setMessage(res.message);
                })
    }, []);

    return (
        <div className={"Homepage"}>
            <div className="polygon">
                <h1>Only Auth Access</h1>

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

export default TeacherDashboard;