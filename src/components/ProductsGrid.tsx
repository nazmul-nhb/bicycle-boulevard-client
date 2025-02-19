import { Col, Empty, Row } from 'antd';
import { Fragment } from 'react';
import type { IProduct } from '../types/product.types';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface Props {
	isLoading: boolean;
	products?: IProduct[];
	skeletonCount: number;
}

const ProductsGrid = ({ isLoading, products, skeletonCount }: Props) => {
	return (
		<Fragment>
			{isLoading ? (
				<Row gutter={[24, 24]}>
					{Array.from({ length: skeletonCount }).map((_, index) => (
						<Col key={index} xs={24} sm={12} md={8} lg={6}>
							<ProductCardSkeleton />
						</Col>
					))}
				</Row>
			) : !products || products?.length === 0 ? (
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
