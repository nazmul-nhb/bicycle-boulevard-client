import { Icon } from '@iconify/react';
import { Button, Col, Flex, Form, Row, Spin } from 'antd';
import { useForm, type FormProps } from 'antd/es/form/Form';
import { createFormData, extractUpdatedFields } from 'nhb-toolbox';
import { useEffect, useMemo, useRef, type Dispatch, type SetStateAction } from 'react';
import type ReactQuill from 'react-quill';
import {
	useGetSingleProductQuery,
	useUpdateProductMutation,
} from '../../../app/api/productApi';
import AntdFormInput from '../../../components/AntdFormInput';
import DraggableUpload from '../../../components/DraggableUpload';
import QuillWrapper from '../../../components/QuillWrapper';
import { categoryOptions } from '../../../configs/constants';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import type { ICreateProduct, IUpdateProduct } from '../../../types/product.types';
import { previewAntdImage } from '../../../utils/helpers';

interface Props {
	id: string;
	setDrawerVisible: Dispatch<SetStateAction<boolean>>;
	setSelectedProductId: Dispatch<SetStateAction<string>>;
}

const UpdateProduct = ({ id, setDrawerVisible, setSelectedProductId }: Props) => {
	const {
		data: productRes,
		isLoading: isProductLoading,
		refetch,
	} = useGetSingleProductQuery(id);

	const [productUpdateForm] = useForm<ICreateProduct>();

	const crateRef = useRef<ReactQuill>(null);

	const [updateProduct, { isLoading }] = useUpdateProductMutation();

	const { handleSuccess, handleError } = useNotifyResponse();

	const previousData: IUpdateProduct = useMemo(
		() => ({
			name: productRes?.data?.name,
			brand: productRes?.data?.brand,
			category: productRes?.data?.category,
			inStock: productRes?.data?.inStock,
			quantity: productRes?.data?.quantity,
			description: productRes?.data?.description,
			price: productRes?.data?.price,
			image: previewAntdImage(productRes?.data?.image as string),
		}),
		[productRes?.data]
	);

	const handleUpdateProduct: FormProps<ICreateProduct>['onFinish'] = async (values) => {
		try {
			const data: IUpdateProduct = {
				...values,
				inStock: values?.inStock && values?.inStock > 0 ? true : false,
			};

			const updatedData = extractUpdatedFields(previousData, data);

			const productData = createFormData(updatedData);

			const res = await updateProduct({ id, data: productData }).unwrap();

			if (res.success) {
				handleSuccess(res);
				await refetch();
				setDrawerVisible(false);
				setSelectedProductId('');
			}
		} catch (err) {
			handleError(err);
		}
	};

	useEffect(() => {
		if (productRes?.data) {
			productUpdateForm.setFieldsValue({
				...previousData,
				inStock: productRes?.data.inStock ? 1 : 0,
			});
		}
	}, [previousData, productRes?.data, productUpdateForm]);

	if (isProductLoading) {
		return (
			<Flex align="center" justify="center" gap="middle">
				<Spin spinning={isProductLoading} percent="auto" size="large" />
			</Flex>
		);
	}

	return (
		<Form
			key={id}
			id={id}
			form={productUpdateForm}
			onFinish={handleUpdateProduct}
			layout="vertical"
			// initialValues={{
			// 	...productRes?.data,
			// 	inStock: productRes?.data?.inStock ? 1 : 0,
			// 	image: previewAntdImage(productRes?.data?.image as string),
			// }}
		>
			<Row gutter={16}>
				<AntdFormInput
					label="Product Name"
					name="name"
					rules={[
						{
							min: 1,
							message: 'Product name must not be empty!',
						},
					]}
				/>
				<AntdFormInput
					label="Brand"
					name="brand"
					prefix={<Icon icon="ic:round-brand-new" width="20" height="20" />}
					rules={[
						{
							min: 1,
							message: 'Product brand must not be empty!',
						},
					]}
				/>
			</Row>

			<Row gutter={16}>
				<AntdFormInput
					label="Update Category"
					name="category"
					type="select"
					options={categoryOptions}
				/>
				<AntdFormInput
					label="Stock Availability"
					name="inStock"
					type="select"
					selectProps={{
						placeholder: 'Select Product Availability',
					}}
					options={[
						{ value: 1, label: 'In Stock' },
						{ value: 0, label: 'Out of Stock' },
					]}
				/>
			</Row>

			<Row gutter={16}>
				<AntdFormInput
					label="Price"
					name="price"
					type="number"
					rules={[
						{
							min: 0,
							type: 'number',
							message: 'Price must be a positive number!',
						},
					]}
				/>
				<AntdFormInput
					label="Quantity"
					name="quantity"
					type="number"
					rules={[
						{
							min: 0,
							type: 'number',
							message: 'Quantity must be a non-negative number!',
						},
					]}
				/>
			</Row>

			<Row style={{ marginBottom: 8 }} gutter={16}>
				<Col xs={24}>
					<Form.Item
						label="Description"
						name="description"
						rules={[
							{
								min: 5,
								message: 'Description must be at least 5 characters long!',
							},
						]}
						getValueFromEvent={(content) => content}
					>
						<QuillWrapper
							ref={crateRef}
							theme="snow"
							className="custom-quill"
							placeholder="Write product details"
						/>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<DraggableUpload
					label="Choose an Image"
					name="image"
					accept="image/*"
					listType="picture"
				/>
			</Row>

			<Row>
				<Col xs={24}>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={isLoading}>
							Update Product
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default UpdateProduct;
