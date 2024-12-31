import "./Header.css";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../private-route/AuthManagement.jsx";
import {hasAnyRoles, hasRole} from "../../utils/jwt.js";

const Header = () => {

    const [authenticated, user, keycloak, , roles] = useContext(AuthContext);

    function handleLogout() {
        keycloak.logout({redirectUri: window.location.origin})
    }

    function handleLogin() {
        keycloak.login();
    }

    function handleViewAccountProfile() {

    }

    return (
        <header className={"Header"}>
            <nav className="Nav">
                <div>
                    <Link className={"ProjectLink"} to={"/"}>Assignment System</Link>
                    <ul className="List">
                        <li><Link to={"/"}>Home</Link></li>

                        {
                            authenticated &&
                            <li><Link to={"protected-dashboard"}>Protected Dashboard</Link></li>
                        }

                        {
                            (hasAnyRoles(["teacher", "admin"], roles)) &&
                            <li><Link to={"teacher-dashboard"}>Teacher Dashboard</Link></li>
                        }

                        {
                            (hasRole("admin", roles)) &&
                            <li><Link to={"admin-dashboard"}>Admin Dashboard</Link></li>
                        }
                    </ul>
                </div>
                <div>
                    {
                        authenticated && user &&
                        <button className={"BtnLogout"} onClick={handleViewAccountProfile}>Profile: {user.username}</button>
                    }
                    {
                        authenticated &&
                        <button className={"BtnLogout"} onClick={handleLogout}>Logout</button>
                    }
                    {
                        !authenticated &&
                        <button className={"BtnLogin"} onClick={handleLogin}>Login From
                            Keycloak</button>
                    }
                </div>
            </nav>

        </header>
    );
};

export default Header;