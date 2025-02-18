import { Icon } from '@iconify/react';
import { Badge, Button, Card, Flex, Tooltip, Typography } from 'antd';
import { truncateString } from 'nhb-toolbox';
import { Link } from 'react-router';
import { AntNotifications } from '../App';
import { addToCart, selectTargetItem } from '../app/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { IProduct } from '../types/product.types';
import { debounceAction, getImageLink } from '../utils/helpers';

const { Title, Text } = Typography;

interface Props {
	product: IProduct;
}

const ProductCard = ({ product }: Props) => {
	const { _id: id, name, brand, price, image, quantity: stock } = product || {};

	const { notify } = AntNotifications(true);

	const dispatch = useAppDispatch();

	const targetItem = useAppSelector((state) => selectTargetItem(state, id));

	const remainingStock = stock - (targetItem?.quantity ?? 0);

	const addProductToCart = debounceAction((quantity: number) => {
		if ((targetItem?.quantity ?? 0) + quantity > stock) {
			return notify.warning({
				message: 'Cannot add to cart! Maximum stock reached!',
			});
		}

		dispatch(addToCart({ id, quantity }));
		notify.success({ message: `${name} has been added to your cart!` });
	}, 500);

	return (
		<Card
			variant="outlined"
			cover={
				<Badge.Ribbon
					color={remainingStock ? 'default' : 'red'}
					text={remainingStock ? 'Available' : 'Out of Stock'}
				>
					<Link to={`/product/${id}`}>
						<figure
							style={{
								overflow: 'hidden',
								borderRadius: '8px 8px 0 0',
								height: 280,
							}}
						>
							<img
								alt={name}
								src={getImageLink(image)}
								className="hover-scale"
								style={{
									height: 280,
									objectFit: 'cover',
									width: '100%',
									borderRadius: '8px 8px 0 0',
									transition: 'transform 0.5s ease-in-out',
								}}
							/>
						</figure>
					</Link>
				</Badge.Ribbon>
			}
			style={{
				borderRadius: 8,
				height: '100%',
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
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
					<Link to={`/product/${id}`}>{truncateString(name, 96)}</Link>
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
					onClick={() => addProductToCart(1)}
					type="primary"
					danger={remainingStock <= 0}
					icon={<Icon icon="ant-design:shopping-cart-outlined" />}
				>
					Add to Cart ({remainingStock})
				</Button>
			</Flex>
		</Card>
	);
};

export default ProductCard;
