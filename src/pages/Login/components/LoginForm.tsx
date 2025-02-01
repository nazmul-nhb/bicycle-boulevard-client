import { Icon } from '@iconify/react';
import { Button, Col, Form, Row } from 'antd';
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

	/** Handles Google login */
	const handleGoogleLogin = () => {
		console.info('Google login clicked!');
	};

	return (
		<Form size="large" form={loginForm} onFinish={handleLogin} layout="vertical">
			{/* Email Field */}
			<Row gutter={16}>
				<AntdFormInput
					colSpan={{ sm: 20, xs: 24 }}
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
					colSpan={{ sm: 20, xs: 24 }}
					label="Your Password"
					name="password"
					type="password"
					prefix={<Icon icon="mdi:password" width="20" height="20" />}
					rules={[{ required: true, message: 'Please input your password!' }]}
				/>
			</Row>

			{/* Submit Button */}
			<Row>
				<Col xs={12}>
					<Form.Item>
						<Button
							block
							icon={
								<Icon
									icon="solar:login-3-bold-duotone"
									width="24"
									height="24"
								/>
							}
							type="primary"
							htmlType="submit"
							loading={isLoading}
							style={{ width: '100%' }}
						>
							Login
						</Button>
					</Form.Item>
				</Col>
			</Row>

			{/* Google Login Button */}
			<Row>
				<Col xs={12}>
					<Form.Item>
						<Button
							block
							type="default"
							icon={<Icon icon="devicon:google" width="24" height="24" />}
							onClick={handleGoogleLogin}
						>
							Login
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default LoginForm;
