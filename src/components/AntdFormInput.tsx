import { type FC, type ReactNode } from 'react';
import { Form, Input, Upload, Select, Button, Col, InputNumber } from 'antd';
import type { UploadProps, SelectProps, FormItemProps, InputNumberProps } from 'antd';
import { Icon } from '@iconify/react';

interface AntdFormInputProps extends FormItemProps {
	type?: 'text' | 'number' | 'password' | 'select' | 'upload' | 'multiselect';
	colSpan?: { xs: number; sm: number };
	numberProps?: InputNumberProps;
	options?: SelectProps['options'];
	selectProps?: SelectProps;
	uploadProps?: UploadProps;
	prefix?: ReactNode;
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
	maxCount = 1,
	numberProps,
	uploadProps,
	selectProps,
	...formItemProps
}) => {
	const renderInput = () => {
		switch (type) {
			case 'number':
				return <InputNumber prefix={prefix} {...numberProps} placeholder={label} />;
			case 'password':
				return <Input.Password prefix={prefix} allowClear placeholder={label} />;
			case 'select':
				return <Select {...selectProps} prefix={prefix} allowClear options={options} placeholder={label} />;
			case 'multiselect':
				return (
					<Select {...selectProps} prefix={prefix}
						mode="multiple"
						allowClear
						options={options}
						placeholder={label}
					/>
				);
			case 'upload':
				return (
					<Upload
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
