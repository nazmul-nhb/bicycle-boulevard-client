import { Icon } from '@iconify/react';
import { Button, Col, Form, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useLoginUserMutation } from '../../../app/api/authApi';
import AntdFormInput from '../../../components/AntdFormInput';
import { useAuth } from '../../../hooks/useAuth';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import type { ICredentials } from '../../../types/user.types';

const LoginForm: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [loginForm] = Form.useForm<ICredentials>();

	const redirectUrl = location.state?.from?.pathname || '/';

	const [loginUser, { isLoading }] = useLoginUserMutation();

	const { handleSuccess, handleError } = useNotifyResponse();

	useEffect(() => {
		if (user) {
			navigate(redirectUrl, { replace: true });
		}
	}, [navigate, redirectUrl, user]);

	/** Handles form submission */
	const handleLogin = async (values: ICredentials) => {
		try {
			const res = await loginUser(values).unwrap();
			if (res.success) {
				handleSuccess(res);
				loginForm.resetFields();
				navigate(redirectUrl, { replace: true });
			}
		} catch (err) {
			handleError(err);
		}
	};

	return (
		<Form
			style={{
				padding: '24px',
				marginTop: '24px',
				borderRadius: '12px',
				backgroundColor: 'rgba(36, 36, 36, 0.61)',
				backdropFilter: 'blur(10px)',
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
				maxWidth: '640px',
				width: '100%',
			}}
			size="large"
			form={loginForm}
			onFinish={handleLogin}
			layout="vertical"
		>
			{/* Email Field */}
			<Row gutter={16}>
				<AntdFormInput
					colSpan={{ sm: 24, xs: 24 }}
					label="Your Email"
					name="email"
					type="text"
					prefix={<Icon icon="ic:round-email" width="20" height="20" />}
					rules={[
						{ required: true, message: 'Please input your email!' },
						{ type: 'email', message: 'Please enter a valid email!' },
					]}
				/>
			</Row>

			{/* Password Field */}
			<Row gutter={16}>
				<AntdFormInput
					colSpan={{ sm: 24, xs: 24 }}
					label="Your Password"
					name="password"
					type="password"
					prefix={<Icon icon="mdi:password" width="20" height="20" />}
					rules={[{ required: true, message: 'Please input your password!' }]}
				/>
			</Row>

			{/* Submit Button */}
			<Row>
				<Col xs={24}>
					<Form.Item>
						<Button
							block
							size="large"
							style={{ width: '100%' }}
							icon={
								<Icon
									icon="ant-design:login-outlined"
									width="24"
									height="24"
								/>
							}
							variant="solid"
							type="default"
							htmlType="submit"
							loading={isLoading}
						>
							Login
						</Button>
					</Form.Item>
				</Col>
			</Row>

			{/* Register Section */}
			<Row justify="center">
				<Col>
					<Typography.Text style={{ color: '#fff', fontSize: '14px' }}>
						Don't have an account?
					</Typography.Text>
				</Col>
			</Row>
			<Row justify="center">
				<Col>
					<Button
						type="link"
						onClick={() => navigate('/register')}
						style={{ fontSize: '14px' }}
					>
						Register Here
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default LoginForm;
