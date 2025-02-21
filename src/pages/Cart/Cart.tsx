import { Col, Empty, Row } from 'antd';
import { useState } from 'react';
import { useGetAllProductsQuery } from '../../app/api/productApi';
import { selectItems } from '../../app/features/cartSlice';
import { useAppSelector } from '../../app/hooks';
import type { TOnQuantityChange, TSelectProducts } from '../../types';
import type { ICartProduct } from '../../types/product.types';
import CartCard from './components/CartCard';
import CartCardSkeleton from './components/CartSkeleton';
import CartSummary from './components/CartSummary';

const Cart = () => {
	const cartItems = useAppSelector(selectItems);
	const [selectedItems, setSelectedItems] = useState<ICartProduct[]>([]);

	const ids = cartItems?.map((item) => item.id);
	const queryEnabled = ids.length > 0;

	const { products = [], isLoading } = useGetAllProductsQuery(
		queryEnabled
			? {
					ids,
					limit: 0,
					select: ['-description', '-isDeleted', '-createdAt', '-updatedAt'],
			  }
			: {},
		{
			skip: !queryEnabled,
			selectFromResult: ({ data, ...rest }) => ({
				products: queryEnabled
					? data?.data?.products.map((product) => {
							const cart = cartItems.find((item) => item.id === product._id);
							return {
								...product,
								cartQuantity: cart?.cartQuantity ?? 0,
								cartDate: cart?.date ?? '',
							} as ICartProduct;
					  })
					: [],
				...rest,
			}),
		}
	);

	const handleQuantityChange: TOnQuantityChange = (product, quantity) => {
		setSelectedItems((prev) =>
			prev.map((item) =>
				item._id === product._id ? { ...item, cartQuantity: quantity } : item
			)
		);
	};

	const handleSelect: TSelectProducts = (product, isSelected) => {
		setSelectedItems((prev) => {
			if (isSelected) {
				const existingItem = prev.find((item) => item._id === product._id);
				if (existingItem) {
					// Update the quantity if already selected
					return prev.map((item) =>
						item._id === product._id
							? { ...item, cartQuantity: product.cartQuantity }
							: item
					);
				}
				return [...prev, product];
			}
			// Remove the item if unchecked
			return prev.filter((item) => item._id !== product._id);
		});
	};

	return (
		<section>
			{isLoading ? (
				<Row gutter={[24, 24]}>
					<Col xs={24} sm={24} md={18}>
						<Row gutter={[24, 24]}>
							{Array.from({ length: 12 }).map((_, idx) => (
								<Col key={idx} xs={24} sm={12} md={8}>
									<CartCardSkeleton />
								</Col>
							))}
						</Row>
					</Col>

					{/* Sticky Cart Summary */}
					<Col xs={24} sm={24} md={6}>
						<CartSummary selectedItems={selectedItems} />
					</Col>
				</Row>
			) : !products || products.length === 0 ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description="No Products in Your Cart!"
					style={{ marginTop: 40 }}
				/>
			) : (
				<Row gutter={[24, 24]}>
					{/* 3-column Cart Cards */}
					<Col xs={24} sm={24} md={18}>
						<Row gutter={[24, 24]}>
							{products.map((product) => (
								<Col key={product._id} xs={24} sm={12} md={8}>
									<CartCard
										product={product}
										onSelect={handleSelect}
										onQuantityChange={handleQuantityChange}
									/>
								</Col>
							))}
						</Row>
					</Col>

					{/* Sticky Cart Summary */}
					<Col xs={24} sm={24} md={6}>
						<CartSummary selectedItems={selectedItems} />
					</Col>
				</Row>
			)}
		</section>
	);
};

export default Cart;
