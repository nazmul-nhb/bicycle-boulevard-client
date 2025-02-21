import { Icon } from '@iconify/react';
import { Button, Card, Checkbox, InputNumber, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { AntNotifications } from '../../../App';
import {
	addToCart,
	removeQuantityFromCart,
	removeSpecificItem,
} from '../../../app/features/cartSlice';
import { useAppDispatch } from '../../../app/hooks';
import type { TOnQuantityChange, TSelectProducts } from '../../../types';
import type { ICartProduct } from '../../../types/product.types';
import { getImageLink } from '../../../utils/helpers';

const { Meta } = Card;

interface Props {
	product: ICartProduct;
	onSelect: TSelectProducts;
	onQuantityChange: TOnQuantityChange;
}

const CartCard: React.FC<Props> = ({ product, onSelect, onQuantityChange }) => {
	const { _id: id, name, image, price, cartQuantity, quantity: stock } = product;
	const dispatch = useAppDispatch();
	const { notify } = AntNotifications(true);
	const [quantity, setQuantity] = useState(1);

	const remainingStock = stock - cartQuantity;

	const handleQuantityChange = (value: number) => {
		if (value < 1) {
			return notify.warning({
				message: 'Cannot add less than 1 item in the cart!',
			});
		}

		if (value > remainingStock) {
			return notify.warning({
				message: 'Cannot add item in the cart! Out of Stock!',
			});
		}

		setQuantity(value);

		onQuantityChange(product, value);
		onSelect({ ...product, cartQuantity: value }, true);
	};

	const handleRemove = () => {
		dispatch(removeSpecificItem(id));
		notify.success({ message: `${name} removed from the cart!` });
	};

	return (
		<Card
			style={{
				position: 'relative',
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				padding: 8,
			}}
			actions={[
				<Button
					key="minus"
					icon={<Icon icon="ant-design:minus-circle-outlined" />}
					onClick={() => {
						dispatch(removeQuantityFromCart({ id, cartQuantity: quantity }));
					}}
					// disabled={quantity > remainingStock}
				/>,
				<InputNumber
					key="input"
					min={0}
					max={stock}
					value={quantity}
					onChange={(val) => handleQuantityChange(Number(val))}
					style={{ width: 64, textAlign: 'center' }}
				/>,
				<Button
					key="plus"
					icon={<Icon icon="ant-design:plus-circle-outlined" />}
					onClick={() => dispatch(addToCart({ id, cartQuantity: quantity }))}
					disabled={quantity > remainingStock}
				/>,
				<Button
					danger
					type="primary"
					onClick={handleRemove}
					icon={<Icon icon="ant-design:delete-outlined" />}
				/>,
			]}
		>
			<Checkbox
				id={`select-cart-${id}`}
				name={`select-cart-${id}`}
				style={{
					position: 'absolute',
					top: 4,
					left: 8,
				}}
				onChange={(e) => onSelect(product, e.target.checked)}
			/>
			<Link to={`/products/${id}`}>
				<Meta
					avatar={
						<img
							style={{
								aspectRatio: 1,
								objectFit: 'cover',
							}}
							alt={name}
							height={80}
							width={80}
							src={getImageLink(image)}
						/>
					}
					title={
						<Tooltip placement="topLeft" title={name}>
							{name}
						</Tooltip>
					}
					description={
						<>
							<div>Price: BDT {price * cartQuantity || 0}</div>
							<Space>
								<span>Qty: {cartQuantity || 0}</span>
								<span>In Stock: {remainingStock || 0}</span>
							</Space>
						</>
					}
				/>
			</Link>
		</Card>
	);
};

export default CartCard;
