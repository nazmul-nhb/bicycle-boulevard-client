import React from 'react';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import LoginForm from './components/LoginForm';
import LottiePlayer from '../../components/LottiePlayer';

const Login: React.FC = () => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Content style={{ padding: '50px' }}>
				<Row gutter={32} justify="center" align="middle">
					<Col xs={24} lg={14} style={{ textAlign: 'center' }}>
						<LottiePlayer lottie="./assets/bicycle.json" />
					</Col>
					<Col xs={24} lg={10}>
						<LoginForm />
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default Login;
