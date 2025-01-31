import React from 'react';
import { Navigate, useLocation } from 'react-router';
import type { ISingleUser } from '../types/user';
import { useGetMeQuery } from '../app/api/authApi';
import { Flex, Spin } from 'antd';
import { useAuth } from '../hooks/useAuth';

interface Props {
	roles: ISingleUser['role'][];
	children: React.ReactNode;
}

const Private: React.FC<Props> = ({ roles, children }) => {
	const location = useLocation();

	const { token, user } = useAuth();

	const { isLoading } = useGetMeQuery();

	if (isLoading) {
		return (
			<Flex align="center" justify="center" gap="middle">
				<Spin percent="auto" size="large" fullscreen />
			</Flex>
		);
	}

	if (!user || !token) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (!roles.includes(user.role)) {
		return <Navigate to="/unauthorized" />;
	}
	return children;
};

export default Private;
