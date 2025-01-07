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
        <header className="w-auto">
            <nav className="d-flex align-items-center justify-content-between p-2 border-bottom shadow">
                <div className="d-flex align-items-center g-2">
                    <Link className={"ProjectLink text-black text-decoration-none fw-bolder fs-2 pe-4"} to={"/"}>CarExpense
                        Tracking</Link>
                    <ul className="d-flex g-2 list-unstyled m-0 p-0">
                        <li>
                            <Link className={"nav-btn text-black text-decoration-none fw-bold fs-4 me-3"}
                                  to={"home"}>Home</Link>
                        </li>

                        {
                            authenticated &&
                            <li>
                                <Link className={"nav-btn text-black text-decoration-none fw-bold fs-4 me-3"}
                                      to={"add-vehicle"}>Add Vehicle</Link>
                            </li>
                        }
                        {
                            authenticated &&
                            <li>
                                <Link className={"nav-btn text-black text-decoration-none fw-bold fs-4 me-3"}
                                      to={"add-transaction"}>Add Transaction</Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className="d-flex align-items-center g-2">
                    {
                        authenticated && user &&
                        <button className={"btn btn-lg btn-info text-white fw-bold me-3"}
                                onClick={handleViewAccountProfile}>Profile: {user.username}</button>
                    }
                    {
                        authenticated &&
                        <button className={"btn btn-lg btn-danger fw-bold"} onClick={handleLogout}>Logout</button>
                    }
                    {
                        !authenticated &&
                        <button className={"btn btn-lg btn-primary fw-bold"} onClick={handleLogin}>Login From
                            Keycloak</button>
                    }
                </div>
            </nav>

        </header>
    );
};

export default Header;