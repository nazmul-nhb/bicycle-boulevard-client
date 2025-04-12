import { Col, Row, Spin } from 'antd';
import React from 'react';
import { useGetAllOrdersQuery } from '../../app/api/orderApi';
import OrderCard from './components/OrderCard';

const ViewOrder: React.FC = () => {
	const { data, isLoading } = useGetAllOrdersQuery();

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div style={{ padding: 24 }}>
			<Row gutter={[24, 24]}>
				{data?.data?.map((order) => (
					<Col key={order._id} xs={24} sm={24} md={12} lg={12} xl={8} xxl={6}>
						<OrderCard order={order} />
					</Col>
				))}
			</Row>
		</div>
	);
};

export default ViewOrder;
