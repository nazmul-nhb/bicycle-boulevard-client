import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useLoginUserMutation } from '../../../app/api/authApi';
import { Icon } from '@iconify/react';
import AntNotifications from '../../../main';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../app/hooks';
import { logIn } from '../../../app/features/authSlice';
import { getDecodedUser } from '../../../utils/helpers';

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loginUser, { isLoading, isSuccess, isError, error, data }] =
		useLoginUserMutation();
	const { toastify } = AntNotifications(true);
	const dispatch = useAppDispatch();

	/** Handles form submission */
	const handleLogin = async (values: { email: string; password: string }) => {
		try {
			await loginUser(values).unwrap();

			// res.

			// if (isSuccess) {
			// 	toastify.success('Successfully logged in!');
			// 	form.resetFields();
			// 	navigate('/');
			// } else if (isError) {
			// 	const errorMessage =
			// 		(error as { data: { message: string } })?.data?.message ||
			// 		'Something went wrong!';
			// 	toastify.error(errorMessage);
			// }

			// 	message.success('Login successful!');
		} catch (err) {
			console.error('Login error:', err);
			// message.error('Failed to login');
		}
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(
				logIn({
					token: data.data ? data.data.token : null,
					user: data.data ? getDecodedUser(data.data.token) : null,
				})
			);
			toastify.success('Successfully logged in!');
			form.resetFields();
			navigate('/');
		} else if (isError) {
			const errorMessage =
				(error as { data: { message: string } })?.data?.message ||
				'Something went wrong!';
			toastify.error(errorMessage);
		}
	}, [form, isSuccess, isError, error, toastify, navigate, dispatch, data]);

	/** Handles Google login */
	const handleGoogleLogin = () => {
		message.success('Google login clicked!');
	};

	return (
		<Form form={form} onFinish={handleLogin} layout="vertical">
			<Row gutter={16}>
				{/* Email Field */}
				<Col xs={24} sm={12}>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
					>
						<Input allowClear placeholder="Your email" />
					</Form.Item>
				</Col>

				{/* Password Field */}
				<Col xs={24} sm={12}>
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password allowClear placeholder="Your password" />
					</Form.Item>
				</Col>
			</Row>

			{/* Submit Button */}
			<Row>
				<Col xs={24}>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Login
						</Button>
					</Form.Item>
				</Col>
			</Row>

			{/* Google Login Button */}
			<Row>
				<Col xs={24}>
					<Form.Item>
						<Button
							type="default"
							icon={<Icon icon="devicon:google" width="24" height="24" />}
							onClick={handleGoogleLogin}
						>
							Login with Google
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default LoginForm;
