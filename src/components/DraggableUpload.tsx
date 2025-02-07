import { Icon } from '@iconify/react';
import { Col, Form, Upload } from 'antd';
import type { FormItemProps } from 'antd/es/form';
import type { UploadListType, UploadProps } from 'antd/es/upload/interface';
import React from 'react';

interface Props extends FormItemProps {
	label: string;
	name: string;
	maxCount?: number;
	accept?: string;
	listType?: UploadListType;
	colSpan?: { xs: number; sm: number };
	uploadProps?: UploadProps;
}

const DraggableUpload: React.FC<Props> = ({
	label,
	name,
	maxCount = 1,
	accept = 'image/*',
	listType = 'picture',
	colSpan = { xs: 24, sm: 24 },
	uploadProps,
	...formItemProps
}) => {
	return (
		<Col xs={colSpan.xs} sm={colSpan.sm}>
			<Form.Item
				label={label}
				name={name}
				{...formItemProps}
				valuePropName="fileList"
				getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
			>
				<Upload.Dragger
					accept={accept}
					listType={listType}
					maxCount={maxCount}
					beforeUpload={() => false}
					{...uploadProps}
				>
					<Icon icon="uil:image-upload" width="32" height="32" />
					<p>Click or drag an image file to this area</p>
				</Upload.Dragger>
			</Form.Item>
		</Col>
	);
};

export default DraggableUpload;
