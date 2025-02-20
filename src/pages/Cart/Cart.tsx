import { Col, Row } from 'antd';
import { useGetAllProductsQuery } from '../../app/api/productApi';
import { selectItems } from '../../app/features/cartSlice';
import { useAppSelector } from '../../app/hooks';
import type { ICartProduct } from '../../types/product.types';
import CartCard from './components/CartCard';

const Cart = () => {
	const cartItems = useAppSelector(selectItems);

	const ids = cartItems?.map((item) => item.id);

	const { products } = useGetAllProductsQuery(
		{
			ids,
			limit: 0,
			select: ['-description', '-isDeleted', '-createdAt', '-updatedAt'],
		},
		{
			skip: !cartItems || !cartItems.length || !ids || !ids.length,
			selectFromResult: ({ data, ...rest }) => ({
				products: data?.data?.products?.map((product) => {
					const cart = cartItems?.find((item) => item.id === product._id);

					return {
						...product,
						cartQuantity: cart?.cartQuantity,
						cartDate: cart?.date,
					} as ICartProduct;
				}),
				...rest,
			}),
		}
	);

	console.log(products);

	return (
		<section>
			<Row gutter={[24, 24]}>
				{products?.map((product) => (
					<Col key={product._id} xs={24} sm={12} md={8} lg={6}>
						<CartCard product={product} />
					</Col>
				))}
			</Row>
		</section>
	);
};

export default Cart;
