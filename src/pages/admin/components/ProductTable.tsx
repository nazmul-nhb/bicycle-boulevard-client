import { Flex, Spin } from 'antd';
import { generateQueryParams } from 'nhb-toolbox';
import { useGetAllProductsQuery } from '../../../app/api/productApi';
import AntdTable from '../../../components/AntdTable';
import { ProductsColumn } from '../utils/ProductsColum';

const ProductTable = () => {
	const queryParams = generateQueryParams({ minPrice: null });

	const { data, isLoading } = useGetAllProductsQuery(queryParams);

	console.log({ data, queryParams });

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
