import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import AuthManagement from "./components/private-route/AuthManagement.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthManagement>
            <App/>
        </AuthManagement>
    </BrowserRouter>
)
