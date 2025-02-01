import { Icon } from '@iconify/react';
import { Button, Flex, Image, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { truncateString } from 'nhb-toolbox';
import type { IProduct } from '../../../types/product.types';
import { formatDateTimeDynamic, getTimeStamp } from '../../../utils/dates';
import { getImageLink } from '../../../utils/helpers';
import { PRODUCT_CATEGORIES } from '../../../configs/constants';

export const ProductsColumn: ColumnsType<IProduct> = [
	{
		title: 'Image',
		dataIndex: 'image',
		key: 'image',
		render: (_, product) => (
			<Image width={40} src={getImageLink(product.image)} alt={product.name} />
		),
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		sorter: (a, b) => a.name.localeCompare(b.name),
		render: (name: string, product) => (
			<Tooltip title={name}>
				<span style={{ color: product.isDeleted ? 'red' : 'green' }}>
					{truncateString(name, 24)}
				</span>
			</Tooltip>
		),
	},
	{
		title: 'Brand',
		dataIndex: 'brand',
		key: 'brand',
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
		onFilter: (category, product) => product.category.startsWith(category as string),
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
		title: 'Created At',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (createdAt: string) => formatDateTimeDynamic(createdAt),
		sorter: (a, b) => getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt),
	},
	{
		title: 'Updated At',
		dataIndex: 'updatedAt',
		key: 'updatedAt',
		render: (updatedAt: string) => formatDateTimeDynamic(updatedAt),
		sorter: (a, b) => getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt),
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
				<Flex align="center">
					{/* Update Button */}
					<Button
						type="primary"
						shape="circle"
						icon={<Icon icon="mdi:pencil" />}
						onClick={() => handleUpdate(id)}
						style={{ marginRight: '8px' }}
					/>

					{/* Delete Button */}
					<Button
						danger
						color="red"
						shape="circle"
						icon={<Icon icon="mdi:delete" />}
						onClick={() => handleDelete(id)}
					/>
				</Flex>
			);
		},
	},
];
