import React from 'react';
import {Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./components/nav/ProtectedRoute";
import {AdminsPage} from "./pages/AdminsPage";
import {ReportsPage} from "./pages/ReportsPage";
import {ProvidersPage} from "./pages/ProvidersPage";
import {GoodsPage} from "./pages/GoodsPage";
import {IssuePointsPage} from "./pages/IssuePointsPage";
import {OrdersPage} from "./pages/OrdersPage";
import {CouriersPage} from "./pages/CouriersPage";
import {EquipmentsPage} from "./pages/EquipmentsPage";
import {AuthPage} from "./pages/AuthPage";
import {CouriersPageU} from "./pages/CouriersPageU";
import {ProvidersPageU} from "./pages/ProvidersPageU";
import {ReportsPageU} from "./pages/ReportsPageU";

function App() {
    return (
        <>
            <Routes>
                <Route path="/admins" element={<ProtectedRoute role="ROLE_ADMIN"><AdminsPage/></ProtectedRoute>}/>
                <Route path="/reports" element={<ProtectedRoute role="ROLE_ADMIN"><ReportsPage/></ProtectedRoute>}/>
                <Route path="/providers" element={<ProtectedRoute role="ROLE_ADMIN"><ProvidersPage/></ProtectedRoute>}/>
                <Route path="/goods" element={<ProtectedRoute role="ROLE_ADMIN"><GoodsPage/></ProtectedRoute>}/>
                <Route path="/issue-points" element={<ProtectedRoute role="ROLE_ADMIN"><IssuePointsPage/></ProtectedRoute>}/>
                <Route path="/orders" element={<ProtectedRoute role="ROLE_ADMIN"><OrdersPage/></ProtectedRoute>}/>
                <Route path="/couriers" element={<ProtectedRoute role="ROLE_ADMIN"><CouriersPage/></ProtectedRoute>}/>
                <Route path="/equipments" element={<ProtectedRoute role="ROLE_ADMIN"><EquipmentsPage/></ProtectedRoute>}/>
                <Route path="/couriers-u" element={<ProtectedRoute role="ROLE_USER"><CouriersPageU/></ProtectedRoute>}/>
                <Route path="/providers-u" element={<ProtectedRoute role="ROLE_USER"><ProvidersPageU/></ProtectedRoute>}/>
                <Route path="/reports-u" element={<ProtectedRoute role="ROLE_USER"><ReportsPageU/></ProtectedRoute>}/>
                <Route path="/" element={<AuthPage/>}/>
            </Routes>
        </>
    );
}

export default App;
