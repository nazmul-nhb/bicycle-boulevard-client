import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Form, Input, Button, Upload, Row, Col, type FormProps } from 'antd';
import { useRegisterUserMutation } from '../../../app/api/authApi';
import AntNotifications from '../../../main';
import type { IRegisterUser } from '../../../types/user';
import { sanitizeFormData } from 'react-form-sanitization';

const RegisterForm: React.FC = () => {
	const [form] = Form.useForm();
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
		} else if (isError) {
			const errorMessage =
				(error as { data: { message: string } })?.data?.message ||
				'Something went wrong!';
			toastify.error(errorMessage);
		}
	}, [form, isSuccess, isError, error, toastify]);

	return (
		<Form form={form} onFinish={handleRegister} layout="vertical">
			<Row gutter={16}>
				{/* Name Field */}
				<Col xs={24} sm={12}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input allowClear placeholder="Your name." />
					</Form.Item>
				</Col>

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
						<Input allowClear placeholder="Your email." />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				{/* Password Field */}
				<Col xs={24} sm={12}>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ required: true, message: 'Please input your password!' },
							{
								min: 6,
								message: 'Password must be at least 6 characters.',
							},
						]}
					>
						<Input.Password allowClear placeholder="Choose your password." />
					</Form.Item>
				</Col>

				{/* Confirm Password Field */}
				<Col xs={24} sm={12}>
					<Form.Item
						label="Confirm Password"
						name="confirm_password"
						dependencies={['password']}
						rules={[
							{ required: true, message: 'Please confirm your password!' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error('Passwords do not match!')
									);
								},
							}),
						]}
					>
						<Input.Password allowClear placeholder="Confirm your password." />
					</Form.Item>
				</Col>
				{/* Image Upload */}
				<Col xs={24} sm={12}>
					<Form.Item
						label="Upload Image"
						name="image"
						valuePropName="fileList"
						getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
						rules={[{ required: true, message: 'Please upload an image!' }]}
					>
						<Upload
							accept="image/*"
							listType="picture"
							maxCount={1}
							beforeUpload={() => false} // Prevent automatic upload
						>
							<Button
								icon={
									<Icon icon="uil:image-upload" width="24" height="24" />
								}
							>
								Upload an Image
							</Button>
						</Upload>
					</Form.Item>
				</Col>
			</Row>

			{/* Submit Button */}
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
