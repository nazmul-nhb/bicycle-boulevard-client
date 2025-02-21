import { Icon } from '@iconify/react';
import { Avatar, Button, Card, Divider, Flex, List, Tooltip } from 'antd';
import { truncateString } from 'nhb-toolbox';
import { Link } from 'react-router';
import { AntNotifications } from '../App';
import { removeSpecificItem } from '../app/features/cartSlice';
import {
	clearOrder,
	removeFromOrder,
	selectOrderItems,
	selectTotal,
} from '../app/features/orderSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getImageLink } from '../utils/helpers';

interface Props {
	isDirectOrder?: boolean;
}

const OrderSummary = ({ isDirectOrder }: Props) => {
	const selectedItems = useAppSelector(selectOrderItems);
	const { totalItems, totalPrice } = useAppSelector(selectTotal);
	const { notify } = AntNotifications(true);

	const dispatch = useAppDispatch();

	const handleRemoveFromOrder = (id: string) => {
		dispatch(removeFromOrder(id));
		notify.success({ message: `Item removed from the order list!` });
	};

	const handleClearOrder = () => {
		if (totalItems < 1) {
			return notify.warning({ message: `Nothing in the order list!` });
		}

		dispatch(clearOrder());
		notify.success({ message: `Order list has been cleared!` });
	};

	const handleCheckOut = () => {
		if (totalItems < 1) {
			return notify.warning({ message: `Please add items to the order list!` });
		}

		// Remove selected items from cart when going to check out
		if (!isDirectOrder) {
			selectedItems.forEach((item) => dispatch(removeSpecificItem(item._id)));
			notify.success({ message: `Taking you to check out page!` });
			return;
		}

		notify.success({ message: `Order has been placed!` });
	};

	return (
		<Card
			title={`Order List (${totalItems} Items)`}
			style={{
				position: 'sticky',
				top: 8,
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				padding: 0,
			}}
			styles={{
				body: { padding: 0 },
				header: { padding: '0 12px' },
			}}
			extra={
				<Tooltip placement="topLeft" title="Clear Order List">
					<Button
						danger
						type="text"
						icon={<Icon width={32} icon="tabler:trash" />}
						onClick={handleClearOrder}
					/>
				</Tooltip>
			}
		>
			<List
				itemLayout="horizontal"
				dataSource={selectedItems}
				className="scrollbar-hide"
				style={{
					maxHeight: '60svh',
					overflowY: 'auto',
					borderRadius: '8px',
					padding: 0,
				}}
				renderItem={(item) => (
					<List.Item style={{ paddingInline: 12 }} key={item._id}>
						<List.Item.Meta
							avatar={<Avatar src={getImageLink(item.image)} />}
							title={
								<Flex align="start" justify="space-between">
									<Link to={`/products/${item._id}`}>
										<Tooltip placement="topLeft" title={item.name}>
											{truncateString(item.name, 56)}
										</Tooltip>
									</Link>

									<Tooltip
										placement="topLeft"
										title="Remove from Order List"
									>
										<Button
											danger
											type="text"
											icon={<Icon width={28} icon="mynaui:trash" />}
											onClick={() => handleRemoveFromOrder(item._id)}
										/>
									</Tooltip>
								</Flex>
							}
							description={`${item.cartQuantity} x ${item.price.toFixed(2)}
								 = BDT ${(item.price * item.cartQuantity).toFixed(2)}`}
						/>
					</List.Item>
				)}
			/>
			<Divider style={{ marginTop: 0 }} />
			<Card.Meta
				style={{ padding: '0 0 24px 12px' }}
				title={`Total Price: BDT ${totalPrice.toFixed(2)}`}
			/>

			<Card.Meta
				style={{ padding: '0 0 24px 12px' }}
				title={
					<Button type="primary" onClick={handleCheckOut}>
						Check Out
					</Button>
				}
			/>
		</Card>
	);
};

export default OrderSummary;
