import {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import useLocalStorage from "../../utils/useLocalStorage";
import {ajaxUrlEncoded, METHOD_POST} from "../../services/fetchService";
import "./Callback.css";
import {getRolesArray} from "../../utils/jwt.js";

const Callback = () => {

    const [searchParams,] = useSearchParams();
    const [, setTokenObject] = useLocalStorage({}, "token")
    const [, setRoles] = useLocalStorage([], "roles")

    const code = searchParams.get("code")
    const logout = searchParams.get("logout")

    useEffect(() => {
        const config = {
            clientId: "assignment-system",
            // clientSecret: "1INm9jAu3ms84wLKCXz1S23LG3a5A1sJ",
            realm: "Assignment",
            authServerUrl: "http://localhost:8080/",
            redirectUri: "http://localhost:5173/callback"
        }

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "authorization_code");
        urlencoded.append("client_id", `${config.clientId}`);
        // urlencoded.append("client_secret", `${config.clientSecret}`);
        urlencoded.append("code", `${code}`);
        urlencoded.append("redirect_uri", encodeURI(`${config.redirectUri}`));

        // handle token exchange while login
        if (code) {
            ajaxUrlEncoded("http://localhost:8080/realms/Assignment/protocol/openid-connect/token", METHOD_POST, null, urlencoded)
                .then((result) => {
                    setTokenObject({
                        access_token: result.access_token,
                        id_token: result.id_token,
                        refresh_token: result.refresh_token
                    })
                    setRoles(getRolesArray(result.access_token))
                    window.location.href = "/dashboard";
                })
                .catch((reason) => {
                    console.log(reason)
                    window.location.href = "/login?loginFailed=true";
                })
        }

        // handle logout from keycloak
        if (logout) {
            setTokenObject(null)
            setRoles([])
            window.location.href = "/";
        }
    }, []);

    return (
        <div className={"Callback"}>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>

            <h1 className={"CallbackRedirect"}>
                Redirecting...
            </h1>
        </div>
    );
};

export default Callback;