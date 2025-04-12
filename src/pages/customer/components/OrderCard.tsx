import { Button, Card, Collapse, Flex, Space, Typography } from 'antd';
import { chronos, formatCurrency } from 'nhb-toolbox';
import React from 'react';
import type { IOrderDetails } from '../../../types/order.types';
import OrderedProduct from './OrderedProduct';

const { Panel } = Collapse;

interface Props {
	order: IOrderDetails;
}

const OrderCard: React.FC<Props> = ({ order }) => {
	const { _id, products, totalPrice, paymentStatus, orderStatus, createdAt } = order;

	return (
		<Collapse
			bordered={false}
			style={{
				boxShadow: '4px 8px 12px rgba(0,0,0,0.3)',
				borderRadius: 10,
				overflow: 'hidden',
			}}
			// ! Use items instead of children
			// items={[]}
		>
			<Panel
				key={_id}
				header={
					<Typography.Text type="secondary">
						{formatCurrency(totalPrice, 'BDT', 'en-GB')} on{' '}
						{chronos(createdAt).formatStrict('mmm Do, yyyy; hh:mm A')}
					</Typography.Text>
				}
			>
				<Space direction="vertical" size="middle" style={{ width: '100%' }}>
					{products.map(({ product, quantity }) => (
						<OrderedProduct
							key={_id + product._id}
							product={product}
							quantity={quantity}
							status={{ orderStatus, paymentStatus }}
						/>
					))}

					<Card size="small" style={{ textAlign: 'right' }}>
						<Flex justify="space-between" align="center">
							{paymentStatus !== 'paid' && (
								<Typography.Text>
									<Button type="primary">Pay Now</Button>
								</Typography.Text>
							)}
							<Typography.Text>
								Total: {formatCurrency(totalPrice, 'BDT', 'en-GB')}
							</Typography.Text>
						</Flex>
					</Card>
				</Space>
			</Panel>
		</Collapse>
	);
};

export default OrderCard;
