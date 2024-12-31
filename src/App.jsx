import AssignmentSystem from "./components/AssignmentSystem.jsx";
import {Route, Routes} from "react-router-dom";
import Callback from "./components/callback/Callback.jsx";
import Homepage from "./components/homepage/Homepage.jsx";
import PrivateRoute from "./components/private-route/PrivateRoute.jsx";
import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
import TeacherDashboard from "./components/dashboard/TeacherDashboard.jsx";
import ProtectedDashboard from "./components/dashboard/ProtectedDashboard.jsx";

function App() {

    return (
        <AssignmentSystem>
            <Routes>
                <Route path={"admin-dashboard"} element={
                    <PrivateRoute>
                        <AdminDashboard/>
                    </PrivateRoute>
                }/>

                <Route path={"teacher-dashboard"} element={
                    <PrivateRoute>
                        <TeacherDashboard/>
                    </PrivateRoute>
                }/>

                <Route path={"protected-dashboard"} element={
                    <PrivateRoute>
                        <ProtectedDashboard/>
                    </PrivateRoute>
                }/>

                <Route path={"callback"} element={<Callback/>}/>
                <Route path={"/"} element={<Homepage/>}/>
            </Routes>
        </AssignmentSystem>
    )
}

export default App
