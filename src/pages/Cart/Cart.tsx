import { Icon } from '@iconify/react';
import { Col, Empty, FloatButton, Row } from 'antd';
import { AntNotifications } from '../../App';
import { useGetAllProductsQuery } from '../../app/api/productApi';
import { clearCart, removeSpecificItem, selectItems } from '../../app/features/cartSlice';
import { removeFromOrder, selectOrderItems } from '../../app/features/orderSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import OrderSummary from '../../components/OrderSummary';
import type { ICartProduct } from '../../types/product.types';
import CartCard from './components/CartCard';
import CartCardSkeleton from './components/CartSkeleton';

const Cart = () => {
	const cartItems = useAppSelector(selectItems);
	const selectedItems = useAppSelector(selectOrderItems);
	const dispatch = useAppDispatch();
	const { notify } = AntNotifications(true);

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

	const handleClearCart = () => {
		if (cartItems.length < 1) {
			return notify.warning({ message: `Nothing to clear in the cart!` });
		}

		dispatch(clearCart());
		ids.forEach((id) => dispatch(removeFromOrder(id)));
		notify.success({ message: `Cleared products from the cart!` });
	};

	const handleClearSelectedFromCart = () => {
		if (selectedItems.length < 1) {
			return notify.warning({ message: `Please select at least 1 item to remove!` });
		}

		selectedItems.forEach((item) => dispatch(removeSpecificItem(item._id)));
		selectedItems.forEach((item) => dispatch(removeFromOrder(item._id)));
		notify.success({ message: `Cleared selected products from the cart!` });
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

					{/* Sticky Order Summary */}
					<Col xs={24} sm={24} md={6}>
						<OrderSummary />
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
									<CartCard product={product} />
								</Col>
							))}
						</Row>
					</Col>

					{/* Sticky Order Summary */}
					<Col xs={24} sm={24} md={6}>
						<OrderSummary />
					</Col>
				</Row>
			)}

			<FloatButton.Group
				tooltip="Remove from Cart"
				trigger="click"
				type="primary"
				style={{ insetInlineEnd: 94, right: 16, bottom: 16 }}
				icon={<Icon icon="ant-design:delete-outlined" />}
			>
				<FloatButton
					onClick={handleClearCart}
					tooltip="Clear All from Cart"
					icon={<Icon icon="tabler:trash" />}
				/>

				<FloatButton
					onClick={handleClearSelectedFromCart}
					tooltip="Clear Selected from Cart"
					icon={<Icon icon="mynaui:trash" />}
					type="primary"
				/>
			</FloatButton.Group>
		</section>
	);
};

export default Cart;
