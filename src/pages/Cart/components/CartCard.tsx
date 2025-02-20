import { Icon } from '@iconify/react';
import { Button, Card, InputNumber } from 'antd';
import React, { useState } from 'react';
import { AntNotifications } from '../../../App';
import { addToCart, removeSpecificItem } from '../../../app/features/cartSlice';
import { useAppDispatch } from '../../../app/hooks';
import AntdImage from '../../../components/AntdImage';
import type { ICartProduct } from '../../../types/product.types';
import { getImageLink } from '../../../utils/helpers';

const { Meta } = Card;

interface Props {
	product: ICartProduct;
}

const CartCard: React.FC<Props> = ({ product }) => {
	const { _id, name, image, price, cartQuantity, quantity: stock } = product;
	const dispatch = useAppDispatch();
	const { notify } = AntNotifications(true);
	const [quantity, setQuantity] = useState(cartQuantity);
	const remainingStock = stock - cartQuantity;

	const handleQuantityChange = (value: number) => {
		if (value < 1) {
			return notify.warning({ message: 'Cannot add less than 1 item in the cart!' });
		}
		setQuantity(value);
		dispatch(addToCart({ id: _id, cartQuantity: value }));
	};

	const handleRemove = () => {
		dispatch(removeSpecificItem(_id));
		notify.success({ message: `${name} removed from the cart!` });
	};

	return (
		<Card
			style={{ width: 300 }}
			extra={
				<Button
					danger
					type="primary"
					onClick={handleRemove}
					icon={<Icon icon="ant-design:delete-outlined" />}
				/>
			}
			actions={[
				<Button
					key="minus"
					icon={<Icon icon="ant-design:minus-circle-outlined" />}
					onClick={() => handleQuantityChange(quantity - 1)}
					disabled={quantity <= 1}
				/>,
				<InputNumber
					key="input"
					min={1}
					max={product.quantity}
					value={quantity}
					onChange={(val) => handleQuantityChange(Number(val))}
					style={{ width: 60, textAlign: 'center' }}
				/>,
				<Button
					key="plus"
					icon={<Icon icon="ant-design:plus-circle-outlined" />}
					onClick={() => handleQuantityChange(quantity + 1)}
					disabled={quantity >= product.quantity}
				/>,
			]}
		>
			<Meta
				avatar={
					<AntdImage
						alt={name}
						disableScaling
						aspectRatio={1}
						objectFit="cover"
						src={getImageLink(image)}
						style={{ width: 64, height: 64 }}
					/>
				}
				title={name}
				description={
					<>
						<div>Price: BDT {price * cartQuantity}</div>
						<div>Qty: {cartQuantity}</div>
						<div>In Stock: {remainingStock}</div>
					</>
				}
			/>
		</Card>
	);
};

export default CartCard;
