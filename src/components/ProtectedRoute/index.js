import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/auth/log-in" replace />;
    }

    return children ? children : <Outlet />;
};
