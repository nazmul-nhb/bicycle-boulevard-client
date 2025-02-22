import { Badge, Button, Card, Col, Divider, Flex, InputNumber, Row, Skeleton } from 'antd';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const ProductDetailsSkeleton = () => {
	const isMobile = useMediaQuery(768);

	return (
		<Card
			style={{
				width: '100%',
				padding: 24,
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
			}}
		>
			<Row gutter={[24, 24]} align="top">
				<Col xs={24} md={10}>
					<Badge.Ribbon text="Loading...">
						<Skeleton
							active
							style={{
								width: '100%',
								aspectRatio: '1',
								display: 'block',
								backgroundColor: 'gray',
								padding: 24,
							}}
						/>
					</Badge.Ribbon>
				</Col>

				<Col xs={24} md={14}>
					<Skeleton title={{ width: '60%' }} paragraph={{ rows: 1 }} active />
					<Skeleton.Button style={{ width: 100, margin: '8px 0' }} active />
					<Divider />
					<Skeleton.Input style={{ width: 120, height: 24 }} active />
					<Divider />
					<Skeleton.Input style={{ width: 120, height: 24 }} active />
					<Divider />

					<Flex
						style={{
							flexDirection: isMobile ? 'column' : 'row',
						}}
						align={isMobile ? 'start' : 'center'}
						gap={8}
					>
						<Button disabled>
							<Skeleton.Button style={{ width: 32 }} active />
						</Button>
						<InputNumber disabled style={{ width: 80 }} />
						<Button disabled>
							<Skeleton.Button style={{ width: 32 }} active />
						</Button>
						<Button type="primary" disabled>
							<Skeleton.Button style={{ width: 120 }} active />
						</Button>
						<Button type="primary" disabled>
							<Skeleton.Button style={{ width: 120 }} active />
						</Button>
					</Flex>

					<Divider />
					<Skeleton title={{ width: '40%' }} paragraph={{ rows: 3 }} active />
				</Col>
			</Row>
		</Card>
	);
};

export default ProductDetailsSkeleton;
