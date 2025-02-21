import { Card, InputNumber, Skeleton, Space } from 'antd';

const { Meta } = Card;

const CartCardSkeleton = () => {
	return (
		<Card
			style={{
				// width: 300,
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				padding: 8,
			}}
			actions={[
				<Skeleton.Button key="minus" style={{ width: 16, height: 24 }} active />,
				<InputNumber disabled style={{ width: 64, height: 24 }} />,
				<Skeleton.Button key="plus" style={{ width: 16, height: 24 }} active />,
				<Skeleton.Button key="delete" style={{ width: 16, height: 24 }} active />,
			]}
		>
			<Meta
				avatar={<Skeleton.Avatar active size={80} shape="square" />}
				title={<Skeleton.Input style={{ width: '80%' }} active />}
				description={
					<Space direction="vertical" size={4} style={{ width: '100%' }}>
						<Skeleton.Input style={{ height: 24 }} active />
						<Skeleton.Input style={{ height: 24 }} active />
					</Space>
				}
			/>
		</Card>
	);
};

export default CartCardSkeleton;
