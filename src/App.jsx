import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import PrivateRoute from "./components/private-route/PrivateRoute.jsx";
import Header from "./components/header/Header.jsx";
import RequiredLogin from "./pages/RequiredLogin.jsx";
import AddVehicle from "./pages/vehicle/AddVehicle.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AddTransaction from "./pages/transaction/AddTransaction.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./components/private-route/AuthManagement.jsx";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import EditVehicle from "./pages/vehicle/EditVehicle.jsx";
import ViewTransaction from "./pages/transaction/ViewTransaction.jsx";
import EditTransaction from "./pages/transaction/EditTransaction.jsx";
import PreviewReport from "./pages/report/PreviewReport.jsx";

function App() {
    const [authenticated] = useContext(AuthContext);
    const [authTimeout, setAuthTimeout] = useState(false);

    useEffect(() => {
        // Set a timeout for authentication loading
        const timeoutId = setTimeout(() => {
            if (authenticated === undefined) {
                setAuthTimeout(true);
            }
        }, 10000); // 10 seconds timeout

        return () => clearTimeout(timeoutId);
    }, [authenticated]);

    if (authenticated === undefined) {
        if (authTimeout) {
            return (
                <div className="container mt-5">
                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">Authentication Taking Longer Than Expected</h4>
                        <p>We&#39;re having trouble connecting to the authentication service. You can:</p>
                        <hr/>
                        <p className="mb-0">
                            - Check your internet connection<br/>
                            - Refresh the page<br/>
                            - Try again later
                        </p>
                    </div>
                </div>
            );
        }
        return <LoadingSpinner message="Authenticating..."/>;
    }

    return (
        <div className="bg-secondary-subtle vh-100">
            <Header/>
            <Routes>
                <Route path={"add-vehicle"} element={
                    <PrivateRoute>
                        <AddVehicle/>
                    </PrivateRoute>
                }/>

                <Route path={"vehicles/:vehicleId/edit"} element={
                    <PrivateRoute>
                        <EditVehicle/>
                    </PrivateRoute>
                }/>

                <Route path={"add-transaction"} element={
                    <PrivateRoute>
                        <AddTransaction/>
                    </PrivateRoute>
                }/>

                <Route path={"transactions/:transactionId"} element={
                    <PrivateRoute>
                        <ViewTransaction/>
                    </PrivateRoute>
                }/>

                <Route path={"transactions/:transactionId/edit"} element={
                    <PrivateRoute>
                        <EditTransaction/>
                    </PrivateRoute>
                }/>

                <Route path={"export-report"} element={
                    <PrivateRoute>
                        <PreviewReport/>
                    </PrivateRoute>
                }/>

                <Route path={"home"} element={
                    <PrivateRoute>
                        <Homepage/>
                    </PrivateRoute>
                }/>

                <Route path={"/"} element={<LandingPage/>}/>
                <Route path={"login-required"} element={<RequiredLogin/>}/>
            </Routes>
        </div>
    )
}

export default App
