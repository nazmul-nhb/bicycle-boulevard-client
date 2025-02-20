import { Icon } from '@iconify/react';
import { Button, Flex, Popconfirm, Spin, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getColorForInitial, truncateString } from 'nhb-toolbox';
import { Fragment, useState } from 'react';
import {
	useDeleteProductMutation,
	useGetAllProductsQuery,
} from '../../../app/api/productApi';
import AntdImage from '../../../components/AntdImage';
import AntdTable from '../../../components/AntdTable';
import CommonDrawer from '../../../components/CommonDrawer';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import { useTheme } from '../../../hooks/useTheme';
import type { IProduct } from '../../../types/product.types';
import { formatDateTimeDynamic, getTimeStamp } from '../../../utils/dates';
import { generateFilters, getImageLink } from '../../../utils/helpers';
import UpdateProduct from './UpdateProduct';

const ProductTable = () => {
	const { isDarkTheme } = useTheme();
	const { handleError, handleSuccess } = useNotifyResponse();

	const [isDrawerVisible, setDrawerVisible] = useState(false);

	const { products, isLoading } = useGetAllProductsQuery(
		{ limit: 0, select: ['-description', '-isDeleted'] },
		{
			selectFromResult: ({ data, ...rest }) => ({
				products: data?.data?.products,
				...rest,
			}),
		}
	);

	const [selectedProductId, setSelectedProductId] = useState<string>('');

	const [deleteProduct] = useDeleteProductMutation();

	const handleDeleteProduct = async (id: string) => {
		try {
			const res = await deleteProduct(id).unwrap();

			if (res.success) {
				handleSuccess(res);
			}
		} catch (error) {
			handleError(error);
		}
	};

	// console.log({ data, queryParams });

	const ProductsColumn: ColumnsType<IProduct> = [
		{
			title: 'Product Title',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: string, product) => (
				<Flex align="center" gap={6}>
					<AntdImage
						width={40}
						height={40}
						src={getImageLink(product.image)}
						alt={product.name}
						preview={false}
					/>
					<Tooltip title={name}>
						<span style={{ fontWeight: 'bold' }}>
							{truncateString(name, 24)}
						</span>
					</Tooltip>
				</Flex>
			),
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			key: 'brand',
			filters: generateFilters(products as IProduct[], 'brand'),
			onFilter: (value, product) => product.brand === value,
			sorter: (a, b) => a.brand.localeCompare(b.brand),
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: 'Category',
			dataIndex: 'category',
			key: 'category',
			filters: generateFilters(products as IProduct[], 'category'),
			filterSearch: true,
			onFilter: (category, product) =>
				product.category.startsWith(category as string),
			sorter: (a, b) => a.category.localeCompare(b.category),
			render: (category: IProduct['category']) => (
				<Tag
					style={{
						borderColor: getColorForInitial(category, 40),
						color: isDarkTheme ? 'white' : getColorForInitial(category),
					}}
					color={
						isDarkTheme
							? getColorForInitial(category, 30)
							: getColorForInitial(category, 10)
					}
				>
					{category}
				</Tag>
			),
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			sorter: (a, b) => a.quantity - b.quantity,
		},
		{
			title: 'Availability',
			dataIndex: 'inStock',
			key: 'inStock',
			render: (inStock: boolean) => (
				<Tag color={inStock ? 'green' : 'red'}>
					{inStock ? 'In Stock' : 'Out of Stock'}
				</Tag>
			),
		},
		{
			title: 'Created By',
			dataIndex: 'createdBy',
			key: 'createdBy',
			filters: generateFilters(products as IProduct[], 'createdBy'),
			onFilter: (value, product) => product.createdBy === value,
			sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
		},
		{
			title: 'Creation Date',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt: string) => formatDateTimeDynamic(createdAt),
			sorter: (a, b) => getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt),
		},
		{
			title: 'Updated Date',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (updatedAt: string) => formatDateTimeDynamic(updatedAt),
			sorter: (a, b) => getTimeStamp(a.updatedAt) - getTimeStamp(b.updatedAt),
		},
		{
			title: 'Actions',
			dataIndex: '_id',
			key: '_id',
			render: (id: string) => {
				return (
					<Fragment key={id}>
						<Flex align="center" gap={4}>
							{/* Update Button */}
							<Tooltip title="Update Product">
								<Button
									color="green"
									type="text"
									variant="text"
									icon={<Icon icon="bx:edit" width={24} />}
									onClick={() => {
										setSelectedProductId(id);
										setDrawerVisible(true);
									}}
								/>
							</Tooltip>

							{/* Delete Button */}
							<Tooltip title="Delete Product">
								<Popconfirm
									onConfirm={() => handleDeleteProduct(id)}
									okText="Yes"
									cancelText="No"
									placement="topRight"
									title="Delete the Product?"
									description="Are you sure to delete this product?"
								>
									<Button
										danger
										type="text"
										icon={<Icon icon="mi:delete" width={24} />}
									/>
								</Popconfirm>
							</Tooltip>
						</Flex>

						<CommonDrawer
							title="Add New Product"
							visible={isDrawerVisible}
							onClose={() => {
								setDrawerVisible(false);
								setSelectedProductId('');
							}}
						>
							<UpdateProduct
								id={selectedProductId}
								setDrawerVisible={setDrawerVisible}
								setSelectedProductId={setSelectedProductId}
							/>
						</CommonDrawer>
					</Fragment>
				);
			},
		},
	];

	if (isLoading) {
		return (
			<Flex align="center" justify="center" gap="middle">
				<Spin spinning={isLoading} percent="auto" size="large" />
			</Flex>
		);
	}

	return (
		<Fragment>
			<AntdTable
				data={products}
				columns={ProductsColumn}
				excludedFields={['createdAt', 'updatedAt', 'createdBy']}
				searchPlaceholder="Search Product"
			/>
		</Fragment>
	);
};

export default ProductTable;
