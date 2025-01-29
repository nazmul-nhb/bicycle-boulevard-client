import React, { useEffect } from 'react';
import { Form, Input, Button, Col, Flex } from 'antd';
import { useLoginUserMutation } from '../../../app/api/authApi';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router';
import type { ICredentials } from '../../../types/user';
import { AntNotifications } from '../../../App';

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm<ICredentials>();

	const { toastify, notify } = AntNotifications(true);

	const [loginUser, { isLoading, isSuccess, isError, error, data }] =
		useLoginUserMutation();

	// const { refetch } = useGetMeQuery();

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
			navigate('/');
		} else if (isError) {
			const errorMessage =
				(error as { data: { message: string } })?.data?.message ||
				'Something went wrong!';
			notify.error({ message: errorMessage });
		}
	}, [form, isSuccess, isError, error, toastify, navigate, data, notify]);

	/** Handles Google login */
	const handleGoogleLogin = () => {
		toastify.success('Google login clicked!');
	};

	return (
		<Form size="large" form={form} onFinish={handleLogin} layout="horizontal">
			<Flex align="center" style={{ flexDirection: 'column' }}>
				{/* Email Field */}
				<Col xs={24} md={12}>
					<Form.Item
						// label="Email"
						name="email"
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
					>
						<Input
							allowClear
							placeholder="Your email"
							prefix={<Icon icon="ic:round-email" width="20" height="20" />}
						/>
					</Form.Item>
				</Col>

				{/* Password Field */}
				<Col xs={24} md={12}>
					<Form.Item
						// label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password
							allowClear
							placeholder="Your password"
							prefix={<Icon icon="mdi:password" width="20" height="20" />}
						/>
					</Form.Item>
				</Col>

				{/* Submit Button */}
				<Col xs={24} md={24}>
					<Form.Item>
						<Button
							iconPosition="end"
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

				{/* Google Login Button */}
				<Col xs={24} md={12}>
					<Form.Item>
						<Button
							type="default"
							icon={<Icon icon="devicon:google" width="24" height="24" />}
							onClick={handleGoogleLogin}
						>
							Login
						</Button>
					</Form.Item>
				</Col>
			</Flex>
		</Form>
	);
};

export default LoginForm;
