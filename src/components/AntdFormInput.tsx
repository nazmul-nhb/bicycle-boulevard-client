import { Icon } from '@iconify/react';
import type { FormItemProps, InputNumberProps, SelectProps, UploadProps } from 'antd';
import { Button, Col, Form, Input, InputNumber, Select, Upload } from 'antd';
import { type FC, type ReactNode } from 'react';

interface AntdFormInputProps extends FormItemProps {
	type?: 'text' | 'number' | 'password' | 'select' | 'upload' | 'multiselect';
	colSpan?: { xs: number; sm: number };
	numberProps?: InputNumberProps;
	options?: SelectProps['options'];
	selectProps?: SelectProps;
	uploadProps?: UploadProps;
	prefix?: ReactNode;
	disabled?: boolean;
	maxCount?: number;
	label: string;
	name: string;
}

const AntdFormInput: FC<AntdFormInputProps> = ({
	type = 'text',
	label,
	name,
	rules,
	prefix,
	colSpan = { xs: 24, sm: 12 },
	options,
	disabled,
	maxCount = 1,
	numberProps,
	uploadProps,
	selectProps,
	...formItemProps
}) => {
	const renderInput = () => {
		switch (type) {
			case 'number':
				return (
					<InputNumber
						disabled={disabled}
						prefix={prefix}
						{...numberProps}
						placeholder={label}
					/>
				);
			case 'password':
				return (
					<Input.Password
						disabled={disabled}
						prefix={prefix}
						allowClear
						placeholder={label}
					/>
				);
			case 'select':
				return (
					<Select
						disabled={disabled}
						{...selectProps}
						prefix={prefix}
						allowClear
						options={options}
						placeholder={label}
					/>
				);
			case 'multiselect':
				return (
					<Select
						disabled={disabled}
						{...selectProps}
						prefix={prefix}
						mode="multiple"
						allowClear
						options={options}
						placeholder={label}
					/>
				);
			case 'upload':
				return (
					<Upload
						disabled={disabled}
						accept="image/*"
						listType="picture"
						maxCount={maxCount}
						beforeUpload={() => false}
						{...uploadProps}
					>
						<Button
							icon={<Icon icon="uil:image-upload" width="24" height="24" />}
						>
							{label}
						</Button>
					</Upload>
				);
			default:
				return <Input prefix={prefix} allowClear placeholder={label} />;
		}
	};

	return (
		<Col xs={colSpan.xs} sm={colSpan.sm}>
			<Form.Item
				label={label}
				name={name}
				rules={rules}
				{...(type === 'upload' &&
					name === 'image' && {
						valuePropName: 'fileList',
						getValueFromEvent: (e) => (Array.isArray(e) ? e : e?.fileList),
					})}
				{...formItemProps}
			>
				{renderInput()}
			</Form.Item>
		</Col>
	);
};

export default AntdFormInput;
