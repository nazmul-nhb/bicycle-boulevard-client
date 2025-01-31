import React from 'react';
import { Button, Flex, Result } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { selectTheme } from '../app/features/themeSlice';

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
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
				status="404"
				title="404 - Not Found"
				subTitle={`"${pathname.replace('/', '')}" does not exist on this site!`}
				extra={
					<Button type="primary" onClick={() => navigate('/')}>
						Go Home
					</Button>
				}
			/>
		</Flex>
	);
};

export default NotFound;
