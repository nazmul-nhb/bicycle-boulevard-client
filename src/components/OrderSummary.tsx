import { Icon } from '@iconify/react';
import { Avatar, Badge, Button, Card, Divider, Flex, List, Tag, Tooltip } from 'antd';
import { truncateString } from 'nhb-toolbox';
import { Link } from 'react-router';
import { AntNotifications } from '../App';
import { useCreateOrderMutation } from '../app/api/orderApi';
import { removeSpecificCartItem } from '../app/features/cartSlice';
import {
	clearOrder,
	removeFromOrder,
	selectOrderItems,
	selectOrderTotals,
} from '../app/features/orderSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNotifyResponse } from '../hooks/useNotifyResponse';
import { getBadgeStyle, getImageLink } from '../utils/helpers';
import type { IOrderData } from '../types/order.types';

interface Props {
	isDirectOrder?: boolean;
}

const OrderSummary = ({ isDirectOrder }: Props) => {
	const dispatch = useAppDispatch();
	const { notify } = AntNotifications(true);
	const selectedItems = useAppSelector(selectOrderItems);
	const { totalItems, totalPrice } = useAppSelector(selectOrderTotals);

	const [createOrder, { isLoading }] = useCreateOrderMutation();
	const { handleSuccess, handleError } = useNotifyResponse();

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

	const handleCheckOut = async () => {
		if (totalItems < 1) {
			return notify.warning({ message: `Please add items to the order list!` });
		}

		const orderData: IOrderData[] = selectedItems.map((item) => ({
			product: item._id,
			quantity: item.cartQuantity,
		}));

		try {
			const res = await createOrder(orderData).unwrap();

			if (res.success) {
				handleSuccess(res);
				selectedItems.forEach((item) => dispatch(removeFromOrder(item._id)));

				// Remove selected items from cart when going to check out
				// ! change the logic a bit...
				if (!isDirectOrder) {
					selectedItems.forEach((item) =>
						dispatch(removeSpecificCartItem(item._id))
					);
					return;
				}
			}
		} catch (error) {
			handleError(error);
		}
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
							description={
								<Tag
									style={{
										paddingInline: 0,
										padding: 0,
										paddingRight: 4,
									}}
								>
									<Badge
										showZero
										style={getBadgeStyle(item.cartQuantity > 0)}
										overflowCount={item.cartQuantity}
										count={item.cartQuantity || 0}
									/>
									x
									<Badge
										showZero
										style={getBadgeStyle(item.price > 0)}
										overflowCount={item.price}
										count={(item.price || 0).toFixed(2)}
									/>{' '}
									= BDT
									<Badge
										showZero
										style={getBadgeStyle(
											item.price * item.cartQuantity > 0
										)}
										overflowCount={item.price * item.cartQuantity}
										count={(
											item.price * item.cartQuantity || 0
										).toFixed(2)}
									/>
								</Tag>
							}
						/>
					</List.Item>
				)}
			/>
			<Divider style={{ marginTop: 0 }} />
			<Card.Meta
				style={{ padding: '0 0 24px 12px' }}
				title={
					<>
						Total Price: BDT
						<Badge
							showZero
							style={{ ...getBadgeStyle(totalPrice > 0, -5.5), fontSize: 17 }}
							overflowCount={totalPrice}
							count={(totalPrice || 0).toFixed(2)}
						/>
					</>
				}
			/>

			<Card.Meta
				style={{ padding: '0 0 24px 12px' }}
				title={
					<Button loading={isLoading} type="primary" onClick={handleCheckOut}>
						Check Out
					</Button>
				}
			/>
		</Card>
	);
};

export default OrderSummary;
