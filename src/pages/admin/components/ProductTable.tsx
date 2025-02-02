import { Icon } from '@iconify/react';
import { Button, Flex, Image, Popconfirm, Spin, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { generateQueryParams, truncateString } from 'nhb-toolbox';
import { useGetAllProductsQuery } from '../../../app/api/productApi';
import AntdTable from '../../../components/AntdTable';
import { PRODUCT_CATEGORIES } from '../../../configs/constants';
import type { IProduct } from '../../../types/product.types';
import { formatDateTimeDynamic, getTimeStamp } from '../../../utils/dates';
import { generateFilters, getImageLink } from '../../../utils/helpers';

const ProductTable = () => {
	const queryParams = generateQueryParams({ minPrice: null });

	const { data, isLoading } = useGetAllProductsQuery(queryParams);

	console.log({ data, queryParams });

	const ProductsColumn: ColumnsType<IProduct> = [
		{
			title: 'Image',
			dataIndex: 'image',
			key: 'image',
			render: (_, product) => (
				<Image
					width={40}
					height={40}
					src={getImageLink(product.image)}
					preview={{ mask: <Icon icon="mdi:eye" /> }}
					alt={product.name}
				/>
			),
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: string) => (
				<Tooltip title={name}>
					<span>{truncateString(name, 24)}</span>
				</Tooltip>
			),
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			key: 'brand',
			filters: generateFilters(data?.data as IProduct[], 'brand'),
			onFilter: (value, record) => record.brand === value,
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
			filters: Object.entries(PRODUCT_CATEGORIES).map(([_key, value]) => ({
				text: value,
				value: value,
			})),
			filterSearch: true,
			onFilter: (category, product) =>
				product.category.startsWith(category as string),
			sorter: (a, b) => a.category.localeCompare(b.category),
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
			sorter: (a, b) => a.quantity - b.quantity,
		},
		{
			title: 'In Stock',
			dataIndex: 'inStock',
			key: 'inStock',
			render: (inStock: boolean) => (
				<span style={{ color: inStock ? 'green' : 'red' }}>
					{inStock ? 'Yes' : 'No'}
				</span>
			),
		},
		{
			title: 'Actions',
			dataIndex: '_id',
			key: '_id',
			render: (id: string) => {
				const handleUpdate = (id: string) => {
					console.log('Update', id);
					// Handle the update action
				};

				const handleDelete = (id: string) => {
					console.log('Delete', id);
					// Handle the delete action
				};
				return (
					<Flex align="center" gap={4}>
						{/* Update Button */}
						<Button
							type="text"
							icon={<Icon icon="bx:edit" width={24} />}
							onClick={() => handleUpdate(id)}
						/>

						{/* Delete Button */}
						<Tooltip title="Delete Product">
							<Popconfirm
								onConfirm={() => handleDelete(id)}
								okText="Yes"
								cancelText="No"
								title="Delete the Product?"
								description="Are you sure to delete this product?"
								icon={
									<Icon
										icon="ph:question-duotone"
										width="20"
										height="20"
									/>
								}
							>
								<Button
									danger
									type="text"
									icon={<Icon icon="mi:delete" width={24} />}
								/>
							</Popconfirm>
						</Tooltip>
					</Flex>
				);
			},
		},
		{
			title: 'Last Updated',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (updatedAt: string) => formatDateTimeDynamic(updatedAt),
			sorter: (a, b) => getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt),
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
		<div>
			<AntdTable
				data={data?.data}
				columns={ProductsColumn}
				searchPlaceholder="Search Product"
			/>
		</div>
	);
};

export default ProductTable;
