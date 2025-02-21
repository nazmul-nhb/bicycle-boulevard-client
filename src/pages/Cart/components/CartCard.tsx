import { Icon } from '@iconify/react';
import {
	Button,
	Card,
	Checkbox,
	InputNumber,
	Space,
	Tooltip,
	Typography,
	type CheckboxRef,
} from 'antd';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { AntNotifications } from '../../../App';
import {
	addToCart,
	removeQuantityFromCart,
	removeSpecificItem,
} from '../../../app/features/cartSlice';
import {
	addToOrder,
	removeFromOrder,
	updateOrderItemQuantity,
} from '../../../app/features/orderSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { ICartProduct } from '../../../types/product.types';
import { getImageLink } from '../../../utils/helpers';

const { Meta } = Card;

interface Props {
	product: ICartProduct;
}

const CartCard: React.FC<Props> = ({ product }) => {
	const { _id: id, name, image, price, cartQuantity, quantity: stock } = product;
	const dispatch = useAppDispatch();
	const { notify } = AntNotifications(true);
	const [quantity, setQuantity] = useState(cartQuantity);
	const checkboxRef = useRef<CheckboxRef | null>(null);

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
	};

	const handleRemoveQuantity = () => {
		dispatch(removeQuantityFromCart({ id, cartQuantity: quantity }));
		dispatch(updateOrderItemQuantity({ id, quantity: cartQuantity - quantity }));
	};

	const handleAddQuantity = () => {
		dispatch(addToCart({ id, cartQuantity: quantity }));
		dispatch(updateOrderItemQuantity({ id, quantity: cartQuantity + quantity }));
	};

	const handleRemoveCartItem = () => {
		dispatch(removeSpecificItem(id));
		notify.success({ message: `${name} removed from the cart!` });
		dispatch(removeFromOrder(id));
	};

	const handleSelectOrder = (isSelected: boolean) => {
		if (isSelected) {
			dispatch(addToOrder(product));
		} else {
			dispatch(removeFromOrder(id));
		}
	};

	const handleCardClick = (e: React.MouseEvent) => {
		// Check if the clicked element or any of its ancestors have the data-action attribute
		let target = e.target as HTMLElement;
		while (target && target !== e.currentTarget) {
			if (
				target.hasAttribute('data-action') ||
				target.closest('.ant-checkbox-wrapper')
			) {
				return; // Skip if the click is on an action element
			}
			target = target.parentElement!;
		}

		// Programmatically toggle the checkbox
		if (checkboxRef.current && checkboxRef.current.input) {
			checkboxRef.current.input.click();
		}
	};

	return (
		<Card
			style={{
				position: 'relative',
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				padding: 8,
			}}
			// styles={{ actions: { borderInline: 'none' } }}
			onClick={handleCardClick}
			actions={[
				<Button
					key="minus"
					icon={<Icon icon="ant-design:minus-circle-outlined" />}
					onClick={handleRemoveQuantity}
					disabled={cartQuantity <= 0}
					data-action="true"
				/>,
				<InputNumber
					key="input"
					min={0}
					max={stock}
					value={quantity}
					onChange={(val) => handleQuantityChange(Number(val))}
					style={{ width: 64, textAlign: 'center' }}
					data-action="true"
				/>,
				<Button
					key="plus"
					icon={<Icon icon="ant-design:plus-circle-outlined" />}
					onClick={handleAddQuantity}
					disabled={quantity > remainingStock}
					data-action="true"
				/>,
				<Tooltip placement="topRight" title={`Remove this product from the cart`}>
					<Button
						danger
						type="text"
						onClick={handleRemoveCartItem}
						icon={<Icon width={30} icon="tabler:trash-x" />}
						data-action="true"
					/>
				</Tooltip>,
			]}
		>
			<Checkbox
				ref={checkboxRef}
				id={`select-cart-${id}`}
				name={`select-cart-${id}`}
				style={{
					position: 'absolute',
					top: 4,
					left: 6,
					zIndex: 1,
				}}
				onChange={(e) => handleSelectOrder(e.target.checked)}
				checked={useAppSelector((state) =>
					state.order.orderItems.some((item) => item._id === id)
				)}
			/>
			<Link data-action="true" to={`/products/${id}`}>
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
							<div>Total: BDT {(price * cartQuantity || 0).toFixed(2)}</div>
							<Space>
								<span>Qty: {cartQuantity || 0}</span>
								<span>Stock: {remainingStock || 0}</span>
							</Space>
						</>
					}
				/>
				<Typography.Text>BDT {price.toFixed(2)}</Typography.Text>
			</Link>
		</Card>
	);
};

export default CartCard;
