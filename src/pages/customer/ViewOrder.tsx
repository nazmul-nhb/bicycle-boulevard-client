import { Spin } from 'antd';
import React from 'react';
import { useGetAllOrdersQuery } from '../../app/api/orderApi';

const ViewOrder: React.FC = () => {
	const { data, isLoading } = useGetAllOrdersQuery();

	if (isLoading) return <Spin />;
	return (
		<section>
			{data?.data?.map((order) => (
				<h3>{order.totalPrice}</h3>
			))}
		</section>
	);
};

export default ViewOrder;
