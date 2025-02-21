import { Icon } from '@iconify/react';
import { Badge, Button, Card, Divider, Flex, Space, Tag, Tooltip, Typography } from 'antd';
import { getColorForInitial, truncateString } from 'nhb-toolbox';
import { Link } from 'react-router';
import { AntNotifications } from '../App';
import { addToCart, selectTargetItem } from '../app/features/cartSlice';
import { selectOrderItems, updateOrderItemQuantity } from '../app/features/orderSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { IProduct } from '../types/product.types';
import { debounceAction, getImageLink } from '../utils/helpers';

const { Title, Text } = Typography;

interface Props {
	product: IProduct;
}

const ProductCard = ({ product }: Props) => {
	const { _id: id, name, brand, price, image, category, quantity: stock } = product || {};

	const { notify } = AntNotifications(true);

	const dispatch = useAppDispatch();

	const targetItem = useAppSelector((state) => selectTargetItem(state, id));
	const orderItems = useAppSelector(selectOrderItems);

	// Calculate existing order quantity for the specific item
	const existingQuantity = orderItems.find((item) => item._id === id)?.cartQuantity ?? 0;

	const remainingStock = stock - (targetItem?.cartQuantity ?? 0);

	const addProductToCart = debounceAction(() => {
		if ((targetItem?.cartQuantity ?? 0) + 1 > stock) {
			return notify.warning({
				message: 'Cannot add to cart! Out of Stock!',
			});
		}

		dispatch(addToCart({ id, cartQuantity: 1 }));
		notify.success({ message: `${name} has been added to your cart!` });
		// Update order items if exists
		dispatch(updateOrderItemQuantity({ id, quantity: existingQuantity + 1 }));
	}, 500);

	return (
		<Card
			variant="outlined"
			cover={
				<Badge.Ribbon
					color={remainingStock ? 'default' : 'red'}
					text={remainingStock ? 'Available' : 'Out of Stock'}
				>
					<Badge.Ribbon
						placement="start"
						color={remainingStock ? 'default' : 'red'}
						text={`Stock: ${remainingStock}`}
					>
						<Link to={`/products/${id}`}>
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
					<Link to={`/products/${id}`}>{truncateString(name, 96)}</Link>
				</Title>
			</Tooltip>

			<Space direction="vertical" style={{ marginTop: 'auto' }}>
				<Flex align="center" justify="space-between">
					<Tag title="Brand" color={getColorForInitial(brand)}>
						{brand}
					</Tag>
					<Tag title="Category" color={getColorForInitial(category)}>
						{category}
					</Tag>
				</Flex>

				<Divider
					style={{
						flexGrow: 1,
						marginTop: 'auto',
					}}
				/>

				<Flex align="center" justify="space-between">
					<Text strong style={{ fontSize: '1.1rem' }}>
						BDT {price.toFixed(2)}
					</Text>
					<Button
						onClick={addProductToCart}
						type="primary"
						danger={remainingStock <= 0}
						icon={<Icon icon="ant-design:shopping-cart-outlined" />}
					>
						Add to Cart
					</Button>
				</Flex>
			</Space>
		</Card>
	);
};

export default ProductCard;
