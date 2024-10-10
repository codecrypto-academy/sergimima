import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import Productor from './components/Productor';
// ... other imports

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['Admins']}>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/productor"
                    element={
                        <ProtectedRoute allowedRoles={['Productores']}>
                            <Productor />
                        </ProtectedRoute>
                    }
                />
                {/* ... other routes */}
            </Routes>
        </Router>
    );
}
