import { Icon } from '@iconify/react';
import { Button, Col, Form, Row } from 'antd';
import { useForm, type FormProps } from 'antd/es/form/Form';
import { sanitizeFormData } from 'react-form-sanitization';
import ReactQuill from 'react-quill';
import { useCreateProductMutation } from '../../../app/api/productApi';
import AntdFormInput from '../../../components/AntdFormInput';
import { PRODUCT_CATEGORIES } from '../../../configs/constants';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import type { ICreateProduct } from '../../../types/product';

const AddProduct = () => {
	const [productForm] = useForm();

	const [createProduct, { isLoading }] = useCreateProductMutation();

	const { handleSuccess, handleError } = useNotifyResponse();

	const categoryOptions = Object.entries(PRODUCT_CATEGORIES).map(([_key, value]) => ({
		value: value,
		label: value,
	}));

	/** - Handle form submission */
	const handleCreateProduct: FormProps<ICreateProduct>['onFinish'] = async (values) => {
		try {
			const data = { ...values, inStock: values.inStock > 0 };
			const productData = sanitizeFormData(data);

			console.log({ data, formData: Object.fromEntries(productData.entries()) });

			const res = await createProduct(productData).unwrap();

			if (res.success) {
				handleSuccess(res);
				productForm.resetFields();
			}
		} catch (err) {
			handleError(err);
		}
	};

	return (
		<Form
			form={productForm}
			onFinish={handleCreateProduct}
			layout="vertical"
			initialValues={{
				category: 'Select A Category',
				inStock: 'Select Product Availability',
			}}
		>
			<Row gutter={16}>
				<AntdFormInput
					label="Product Name"
					name="name"
					rules={[
						{ required: true, message: 'Please input the product name!' },
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
						{ required: true, message: 'Please input the product brand!' },
						{
							min: 1,
							message: 'Product brand must not be empty!',
						},
					]}
				/>
			</Row>

			<Row gutter={16}>
				<AntdFormInput
					label="Category"
					name="category"
					type="select"
					options={categoryOptions}
					rules={[{ required: true, message: 'Please select a category!' }]}
				/>
				<AntdFormInput
					label="Stock Availability"
					name="inStock"
					type="select"
					selectProps={{
						placeholder: 'Select Product Availability',
					}}
					options={[
						{ value: 1, label: 'In Stack' },
						{ value: 0, label: 'Out of Stock' },
					]}
					rules={[
						{ required: true, message: 'Please specify stock availability!' },
					]}
				/>
			</Row>

			<Row gutter={16}>
				<AntdFormInput
					label="Price"
					name="price"
					type="number"
					rules={[
						{ required: true, message: 'Please input the product price!' },
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
						{ required: true, message: 'Please input the product quantity!' },
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
								required: true,
								message: 'Please enter a product description!',
							},
							{
								min: 5,
								message: 'Description must be at least 5 characters long!',
							},
						]}
						getValueFromEvent={(content) => content}
					>
						<ReactQuill
							// value={description}
							// onChange={setDescription}
							theme="snow"
							className="custom-quill"
							placeholder="Write product details"
						/>
					</Form.Item>
				</Col>
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
							Add Product
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default AddProduct;
