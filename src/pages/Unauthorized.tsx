import React from 'react';
import { Button, Flex, Result } from 'antd';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { selectTheme } from '../app/features/themeSlice';

const Unauthorized: React.FC = () => {
	const navigate = useNavigate();
	const appTheme = useAppSelector(selectTheme);

	return (
		<Flex
			align="center"
			justify="center"
			style={{
				backgroundColor: appTheme === 'dark' ? '#141414' : '#727272',
				height: '100vh',
			}}
		>
			<Result
				status="403"
				title="403 - Unauthorized"
				subTitle="You do not have permission to access this page!"
				extra={
					<Button type="primary" onClick={() => navigate('/')}>
						Go Home
					</Button>
				}
			/>
		</Flex>
	);
};

export default Unauthorized;
