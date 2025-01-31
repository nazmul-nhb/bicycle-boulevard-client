import React, { useEffect } from 'react';
import { Form, Button, Row, Col, type FormProps } from 'antd';
import { useRegisterUserMutation } from '../../../app/api/authApi';
import type { IRegisterUser } from '../../../types/user';
import { sanitizeFormData } from 'react-form-sanitization';
import { useLocation, useNavigate } from 'react-router';
import { AntNotifications } from '../../../App';
import { useAuth } from '../../../hooks/useAuth';
import AntdFormInput from '../../../components/AntdFormInput';
import { Icon } from '@iconify/react';

const RegisterForm: React.FC = () => {
	const { user } = useAuth();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const location = useLocation();

	const redirectUrl = location.state?.from?.pathname || '/';

	const [registerUser, { isLoading, isSuccess, isError, error }] =
		useRegisterUserMutation();
	const { toastify } = AntNotifications(true);

	/** * Handles form submission */
	const handleRegister: FormProps<IRegisterUser>['onFinish'] = async (data) => {
		try {
			// Sanitize and format form data
			const formattedData = sanitizeFormData(data, {
				ignoreKeys: ['confirm_password'],
			});

			await registerUser(formattedData).unwrap();
		} catch (err) {
			console.error('Error during registration:', err);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			toastify.success('User registered successfully!');
			form.resetFields();
			navigate('/login');
		} else if (isError) {
			const errorMessage =
				(error as { data: { message: string } })?.data?.message ||
				'Something went wrong!';
			toastify.error(errorMessage);
		}
	}, [form, isSuccess, isError, error, toastify, navigate]);

	useEffect(() => {
		if (user) {
			navigate(redirectUrl, { replace: true });
		}
	}, [navigate, redirectUrl, user]);

	return (
		<Form form={form} onFinish={handleRegister} layout="vertical">
			<Row gutter={16}>
				<AntdFormInput
					label="Name"
					name="name"
					prefix={<Icon icon="majesticons:user" width="20" height="20" />}
					rules={[{ required: true, message: 'Please input your name!' }]}
				/>
				<AntdFormInput
					label="Email"
					name="email"
					type="text"
					prefix={<Icon icon="ic:round-email" width="20" height="20" />}
					rules={[
						{ required: true, type: 'email', message: 'Enter a valid email!' },
					]}
				/>
			</Row>

			<Row gutter={16}>
				<AntdFormInput
					label="Password"
					name="password"
					type="password"
					prefix={<Icon icon="mdi:password" width="20" height="20" />}
					rules={[{ required: true, min: 6, message: 'At least 6 characters' }]}
				/>
				<AntdFormInput
					label="Confirm Password"
					name="confirm_password"
					type="password"
					prefix={<Icon icon="mdi:password" width="20" height="20" />}
					rules={[
						{ required: true, message: 'Please confirm your password!' },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Passwords do not match!'));
							},
						}),
					]}
				/>
			</Row>

			<Row gutter={16}>
				<AntdFormInput
					label="Select an Image"
					name="image"
					type="upload"
					rules={[{ required: true, message: 'Please upload an image!' }]}
				/>
			</Row>

			<Row>
				<Col xs={24}>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Register
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default RegisterForm;
