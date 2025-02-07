import { Flex, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import LoginForm from './components/LoginForm';

const Register: React.FC = () => {
	return (
		<Layout style={{ minHeight: '100svh' }}>
			<Content
				style={{
					overflow: 'hidden',
					position: 'relative',
					backgroundImage: 'url("/assets/bicycle-handle.jpg")',
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
						backdropFilter: 'blur(4px)',
						WebkitBackdropFilter: 'blur(4px)',
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
						Log into Your Account
					</Title>
					<LoginForm />
				</Flex>
			</Content>
		</Layout>
	);
};

export default Register;
