import { Col, Empty, Row, Skeleton } from 'antd';
import { Fragment } from 'react';
import type { IProduct } from '../types/product.types';
import ProductCard from './ProductCard';

interface Props {
	isLoading: boolean;
	products?: IProduct[];
}

const ProductsGrid = ({ isLoading, products }: Props) => {
	return (
		<Fragment>
			{isLoading ? (
				<Row gutter={[24, 24]}>
					{Array.from({ length: 12 }).map((_, index) => (
						<Col key={index} xs={24} sm={12} md={8} lg={6}>
							<Skeleton active={isLoading} />
						</Col>
					))}
				</Row>
			) : products?.length === 0 ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description="No Products Found!"
					style={{ marginTop: 40 }}
				/>
			) : (
				<Row gutter={[24, 24]}>
					{products?.map((product) => (
						<Col key={product._id} xs={24} sm={12} md={8} lg={6}>
							<ProductCard product={product} />
						</Col>
					))}
				</Row>
			)}
		</Fragment>
	);
};

export default ProductsGrid;
