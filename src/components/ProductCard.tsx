import { Icon } from '@iconify/react';
import { Button, Card, Flex, Tooltip, Typography } from 'antd';
import { truncateString } from 'nhb-toolbox';
import { Link } from 'react-router';
import type { IProduct } from '../types/product.types';
import { getImageLink } from '../utils/helpers';

const { Title, Text } = Typography;

interface ProductCardProps {
	product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { _id, name, brand, price, image } = product;

	return (
		<Card
			hoverable
			variant="outlined"
			cover={
				<Link to={`/product/${_id}`}>
					<img
						alt={name}
						src={getImageLink(image)}
						style={{
							height: 280,
							objectFit: 'cover',
							width: '100%',
							borderRadius: '8px 8px 0 0',
						}}
					/>
				</Link>
			}
			style={{
				borderRadius: 8,
				height: '100%',
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				display: 'flex',
				flexDirection: 'column',
			}}
			styles={{
				body: {
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					padding: '16px',
				},
			}}
		>
			<Tooltip title={name}>
				<Title level={5} style={{ marginBottom: 8 }}>
					<Link to={`/product/${_id}`}>{truncateString(name, 96)}</Link>
				</Title>
			</Tooltip>
			<Text type="secondary" style={{ marginBottom: 8 }}>
				{brand}
			</Text>
			<Flex
				align="center"
				justify="space-between"
				style={{ marginTop: 'auto' }} // Pushes this section to the bottom
			>
				<Text strong style={{ fontSize: '1.1rem' }}>
					BDT {price.toFixed(2)}
				</Text>
				<Button
					type="primary"
					icon={<Icon icon="ant-design:shopping-cart-outlined" />}
				>
					Add to Cart
				</Button>
			</Flex>
		</Card>
	);
};

export default ProductCard;
