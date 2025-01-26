import React from 'react';
import RegisterForm from './components/RegisterForm';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import LottieBicycle from './components/LottieBicycle';

const Register: React.FC = () => {
	return (
		<Layout>
			<Content style={{ padding: '50px' }}>
				<Row gutter={32} justify="center" align="middle">
					<Col xs={24} lg={14} style={{ textAlign: 'center' }}>
						<LottieBicycle />
					</Col>
					<Col xs={24} lg={10}>
						<RegisterForm />
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default Register;
