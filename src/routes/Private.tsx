import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../app/features/authSlice';
import type { ISingleUser } from '../types/user';
import { useGetMeQuery } from '../app/api/authApi';
import { Flex, Spin } from 'antd';

interface Props {
	roles: ISingleUser['role'][];
	children: React.ReactNode;
}

const Private: React.FC<Props> = ({ roles, children }) => {
	const location = useLocation();
	const user = useAppSelector(selectUser);

	const { isLoading } = useGetMeQuery();

	if (isLoading) {
		return (
			<Flex align="center" justify="center" gap="middle">
				<Spin percent="auto" size="large" fullscreen />
			</Flex>
		);
	}

	console.log({ user });

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	if (!roles.includes(user.role)) {
		return <Navigate to="/unauthorized" />;
	}
	return children;
};

export default Private;
