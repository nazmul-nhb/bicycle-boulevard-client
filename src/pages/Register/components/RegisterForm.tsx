import { Icon } from '@iconify/react';
import { Button, Col, Form, Row, Typography, type FormProps } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRegisterUserMutation } from '../../../app/api/authApi';
import AntdFormInput from '../../../components/AntdFormInput';
import DraggableUpload from '../../../components/DraggableUpload';
import { useAuth } from '../../../hooks/useAuth';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import type { IRegisterUser } from '../../../types/user.types';
import { createFormData } from 'nhb-toolbox';

const RegisterForm: React.FC = () => {
	const { user } = useAuth();
	const [registrationForm] = Form.useForm();
	const navigate = useNavigate();
	const location = useLocation();

	const redirectUrl = location.state?.from?.pathname || '/';

	const [registerUser, { isLoading }] = useRegisterUserMutation();

	const { handleSuccess, handleError } = useNotifyResponse();

	useEffect(() => {
		if (user) {
			navigate(redirectUrl, { replace: true });
		}
	}, [navigate, redirectUrl, user]);

	/** * Handles form submission */
	const handleRegister: FormProps<IRegisterUser>['onFinish'] = async (data) => {
		try {
			// Sanitize and format form data
			const formattedData = createFormData(data, {
				ignoreKeys: ['confirm_password'],
			});

			const res = await registerUser(formattedData).unwrap();

			if (res.success) {
				handleSuccess(res);
				registrationForm.resetFields();
				navigate('/login');
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
			form={registrationForm}
			onFinish={handleRegister}
			layout="vertical"
		>
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
				<DraggableUpload
					rules={[{ required: true, message: 'Please upload an image!' }]}
					label="Choose an Image for Your Profile"
					name="image"
					accept="image/*"
					listType="picture"
				/>
			</Row>

			<Row>
				<Col xs={24}>
					<Form.Item>
						<Button
							variant="solid"
							type="default"
							htmlType="submit"
							loading={isLoading}
							block
							size="large"
							style={{ width: '100%' }}
							icon={
								<Icon icon="mdi:register-outline" width="24" height="24" />
							}
						>
							Register
						</Button>
					</Form.Item>
				</Col>
			</Row>

			{/* Login Section */}
			<Row justify="center">
				<Col>
					<Typography.Text style={{ color: '#fff', fontSize: '14px' }}>
						Already have an account?
					</Typography.Text>
				</Col>
			</Row>
			<Row justify="center">
				<Col>
					<Button
						type="link"
						onClick={() => navigate('/login')}
						style={{ fontSize: '14px' }}
					>
						Login Here
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default RegisterForm;
