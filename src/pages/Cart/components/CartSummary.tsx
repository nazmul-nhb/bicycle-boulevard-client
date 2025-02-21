import { Card } from 'antd';
import type { ICartProduct } from '../../../types/product.types';

interface CartSummaryProps {
	selectedItems: ICartProduct[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ selectedItems }) => {
	const totalPrice = selectedItems.reduce(
		(sum, item) => sum + item.price * item.cartQuantity,
		0
	);

	const totalItems = selectedItems.reduce((acc, item) => acc + item.cartQuantity, 0);

	return (
		<Card
			style={{
				position: 'sticky',
				top: 8,
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				padding: 8,
			}}
		>
			<h3>Cart Summary</h3>
			<p>Total Items: {totalItems}</p>
			<p>Total Price: BDT {totalPrice.toFixed(2)}</p>
		</Card>
	);
};

export default CartSummary;
