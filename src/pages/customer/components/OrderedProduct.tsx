import { Badge, Card, Space, Tag, Tooltip, Typography } from 'antd';
import { capitalizeString, formatCurrency } from 'nhb-toolbox';
import { Link } from 'react-router';
import type { IOrderDetails } from '../../../types/order.types';
import type { IProduct } from '../../../types/product.types';
import { getBadgeStyle, getImageLink } from '../../../utils/helpers';

const { Meta } = Card;

interface Props {
	product: Omit<IProduct, 'createdBy'>;
	quantity: number;
	status: {
		paymentStatus: IOrderDetails['paymentStatus'];
		orderStatus: IOrderDetails['orderStatus'];
	};
}
const OrderedProduct = ({ product, quantity, status }: Props) => {
	const { _id, name, image, price } = product;

	const { orderStatus, paymentStatus } = status;

	return (
		<Card
			key={_id}
			type="inner"
			hoverable
			style={{
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
			}}
		>
			<Link to={`/products/${_id}`} data-action="true">
				<Meta
					avatar={
						<Space direction="vertical">
							<img
								style={{
									aspectRatio: 1,
									objectFit: 'cover',
									borderRadius: 6,
								}}
								alt={name}
								height={80}
								width={80}
								src={getImageLink(image)}
							/>

							<Space direction="vertical">
								<Tag
									style={{
										fontSize: 14,
										padding: '3px 5px 4px 8px',
									}}
								>
									{formatCurrency(price * quantity, 'BDT', 'en-GB')}
								</Tag>

								<Tag
									style={{
										fontSize: 14,
										padding: '3px 5px 4px 8px',
									}}
								>
									Qty:{' '}
									<Badge
										showZero
										style={getBadgeStyle(quantity > 0, -3)}
										count={quantity}
									/>
								</Tag>
							</Space>
						</Space>
					}
					title={
						<Tooltip placement="topLeft" title={name}>
							{name}
						</Tooltip>
					}
					description={
						<Space direction="vertical">
							<Typography.Text strong>
								Unit Price:{' '}
								<Badge
									showZero
									style={getBadgeStyle(price > 0, -4)}
									count={`BDT ${price.toFixed(2)}`}
								/>
							</Typography.Text>
							<Typography.Text>
								<Tag color={orderStatus === 'pending' ? 'orange' : 'green'}>
									Order: {capitalizeString(orderStatus)}
								</Tag>
							</Typography.Text>
							<Typography.Text>
								<Tag
									color={
										paymentStatus === 'pending' ? 'volcano' : 'green'
									}
								>
									Payment: {capitalizeString(paymentStatus)}
								</Tag>
							</Typography.Text>
						</Space>
					}
				/>
			</Link>
		</Card>
	);
};

export default OrderedProduct;
