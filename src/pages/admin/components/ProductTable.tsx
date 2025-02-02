import { Icon } from '@iconify/react';
import { Button, Flex, Image, Popconfirm, Spin, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { generateQueryParams, truncateString } from 'nhb-toolbox';
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
			filters: generateFilters(data?.data as IProduct[], 'category'),
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
					<Fragment>
						<Flex key={id} align="center" gap={4}>
							{/* Update Button */}
							<Button
								type="text"
								icon={<Icon icon="bx:edit" width={24} />}
								onClick={() => setDrawerVisible(true)}
							/>

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
							onClose={() => setDrawerVisible(false)}
						>
							<UpdateProduct id={id} setDrawerVisible={setDrawerVisible} />
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
