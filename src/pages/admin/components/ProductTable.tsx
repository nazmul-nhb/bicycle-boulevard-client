import { Icon } from '@iconify/react';
import { Button, Flex, Image, Popconfirm, Spin, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { generateQueryParams, getColorForInitial, truncateString } from 'nhb-toolbox';
import { Fragment, useState } from 'react';
import {
	useDeleteProductMutation,
	useGetAllProductsQuery,
} from '../../../app/api/productApi';
import AntdTable from '../../../components/AntdTable';
import CommonDrawer from '../../../components/CommonDrawer';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import type { IProduct } from '../../../types/product.types';
import { formatDateTimeDynamic, getTimeStamp } from '../../../utils/dates';
import { generateFilters, getImageLink } from '../../../utils/helpers';
import UpdateProduct from './UpdateProduct';

const ProductTable = () => {
	const { handleError, handleSuccess } = useNotifyResponse();
	const queryParams = generateQueryParams({ sort: null });
	const [isDrawerVisible, setDrawerVisible] = useState(false);

	const { data, isLoading } = useGetAllProductsQuery(queryParams);
	
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
					<span>{name.length > 24 ? truncateString(name, 24) : name}</span>
				</Tooltip>
			),
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			key: 'brand',
			filters: generateFilters(data?.data as IProduct[], 'brand'),
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
			filters: generateFilters(data?.data as IProduct[], 'category'),
			filterSearch: true,
			onFilter: (category, product) =>
				product.category.startsWith(category as string),
			sorter: (a, b) => a.category.localeCompare(b.category),
			render: (category: IProduct['category']) => (
				<Tag
					style={{
						backgroundColor: getColorForInitial(category, 30),
						borderColor: getColorForInitial(category, 60),
					}}
					color={getColorForInitial(category, 50)}
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
			title: 'Last Updated',
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
				data={data?.data}
				columns={ProductsColumn}
				searchPlaceholder="Search Product"
			/>
		</Fragment>
	);
};

export default ProductTable;
