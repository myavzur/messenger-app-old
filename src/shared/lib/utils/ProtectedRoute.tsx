import React from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
	redirectPath: string;
	hasAccess: boolean;
	outlet: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({
	hasAccess,
	outlet,
	redirectPath
}) => {
	return hasAccess ? outlet : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
