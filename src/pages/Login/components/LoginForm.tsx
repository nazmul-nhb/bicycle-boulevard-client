import React, { useEffect } from 'react';
import { Form, Button, Col, Row } from 'antd';
import { useLoginUserMutation } from '../../../app/api/authApi';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router';
import type { ICredentials } from '../../../types/user';
import { AntNotifications } from '../../../App';
import { useAuth } from '../../../hooks/useAuth';
import AntdFormInput from '../../../components/AntdFormInput';

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	const [form] = Form.useForm<ICredentials>();

	const redirectUrl = location.state?.from?.pathname || '/';

	const { toastify, notify } = AntNotifications(true);

	const [loginUser, { isLoading, isSuccess, isError, error, data }] =
		useLoginUserMutation();

	useEffect(() => {
		if (user) {
			navigate(redirectUrl, { replace: true });
		}
	}, [navigate, redirectUrl, user]);

	/** Handles form submission */
	const handleLogin = async (values: ICredentials) => {
		try {
			await loginUser(values).unwrap();
			// refetch();
		} catch (err) {
			console.error('Login error:', err);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			toastify.success('Successfully logged in!');
			form.resetFields();
			navigate(redirectUrl, { replace: true });
		} else if (isError) {
			const errorMessage =
				(error as { data: { message: string } })?.data?.message ||
				'Something went wrong!';
			notify.error({ message: errorMessage });
		}
	}, [form, isSuccess, isError, error, toastify, navigate, data, notify, redirectUrl]);

	/** Handles Google login */
	const handleGoogleLogin = () => {
		toastify.success('Google login clicked!');
	};

	return (
		<Form size="large" form={form} onFinish={handleLogin} layout="vertical">
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
