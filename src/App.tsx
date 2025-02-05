import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../src/feature/auth/pages/login/Login";
import PrivateRoute from "./feature/auth/security/private-route/PrivateRoute.tsx";
import DashboardPage from "./feature/auth/pages/dashboard/Dashboard.tsx";
import RegisterPage from "./feature/auth/pages/register/Register.tsx";
import "./i18n";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
                {}
            </Routes>
        </Router>
    );
};

export default App;

