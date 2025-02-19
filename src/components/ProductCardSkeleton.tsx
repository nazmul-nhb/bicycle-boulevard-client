import { Badge, Card, Divider, Flex, Skeleton, Space, Typography } from 'antd';

const { Title } = Typography;

const ProductCardSkeleton = () => {
	return (
		<Card
			style={{
				borderRadius: 8,
				height: '100%',
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
			}}
			styles={{
				body: {
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					padding: '16px',
				},
			}}
		>
			<Badge.Ribbon text="Loading...">
				<Badge.Ribbon placement="start" text="Loading...">
					<Skeleton
						active
						avatar
						paragraph={{ rows: 1 }}
						title={false}
						round
						style={{
							width: '100%',
							aspectRatio: '1',
							display: 'block',
							backgroundColor: 'gray',
							padding: 24,
						}}
					/>
				</Badge.Ribbon>
			</Badge.Ribbon>
			<Title level={5} style={{ marginBottom: 8 }}>
				<Skeleton.Input style={{ width: 120, height: 24 }} active />
			</Title>

			<Space direction="vertical" style={{ marginTop: 'auto' }}>
				<Flex align="center" justify="space-between">
					<Skeleton.Button style={{ width: 48, height: 16 }} active />
					<Skeleton.Button style={{ width: 48, height: 16 }} active />
				</Flex>

				<Divider
					style={{
						width: '100%',
						flexGrow: 1,
						marginTop: 'auto',
					}}
				/>

				<Flex align="center" justify="space-between">
					<Skeleton.Button style={{ width: 80, height: 24 }} active />
					<Skeleton.Button style={{ width: 120 }} active />
				</Flex>
			</Space>
		</Card>
	);
};

export default ProductCardSkeleton;
