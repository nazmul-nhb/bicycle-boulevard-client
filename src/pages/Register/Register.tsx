import { Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import RegisterForm from './components/RegisterForm';

const Register: React.FC = () => {
	return (
		<Layout style={{ minHeight: '100svh' }}>
			<Content
				style={{
					overflow: 'hidden',
					position: 'relative',
					backgroundImage: 'url("/assets/bicycle-wheel.jpg")',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
				}}
			>
				{/* Backdrop Filter */}
				<div
					style={{
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						position: 'absolute',
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
						backdropFilter: 'blur(1px)',
						WebkitBackdropFilter: 'blur(1px)',
					}}
				/>
				<Flex
					align="center"
					justify="center"
					style={{
						flexDirection: 'column',
						margin: '48px 32px',
						position: 'relative',
						zIndex: 10,
					}}
				>
					<Title style={{ zIndex: 10 }} level={3}>
						Register New Account
					</Title>
					<RegisterForm />
				</Flex>
			</Content>
		</Layout>
	);
};

export default Register;
