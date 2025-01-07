import {useContext} from 'react';
import {AuthContext} from "../components/private-route/AuthManagement.jsx";
import {Link} from "react-router-dom";

const LandingPage = () => {
    const [, user, keycloak] = useContext(AuthContext);

    return (
        <div className={"container mt-3"}>
            <div className="polygon">

                {!user &&
                    <h1>Welcome to Assignment System</h1>
                }
                {user &&
                    <h1>Welcome back, <u>{user.firstName + " " + user.lastName}</u></h1>
                }
                {keycloak.authenticated &&
                    <h3><Link to={"/home"}>Click here to go to home page</Link></h3>
                }
            </div>
        </div>
    );
};

export default LandingPage;