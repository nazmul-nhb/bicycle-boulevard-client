import { Icon } from '@iconify/react';
import { Button, Card, Row } from 'antd';
import React, { useState } from 'react';
import AntdBreadcrumb from '../../components/AntdBreadcrumb';
import CommonDrawer from '../../components/CommonDrawer';
import AddProduct from './components/AddProduct';
import ProductTable from './components/ProductTable';

const ManageProducts: React.FC = () => {
	const [isDrawerVisible, setDrawerVisible] = useState(false);

	return (
		<section>
			<Card size="small">
				<Row align="middle" justify="space-between" gutter={[5, 16]}>
					<AntdBreadcrumb />
					<Button
						icon={<Icon icon="mdi:plus" />}
						type="primary"
						onClick={() => setDrawerVisible(true)}
					>
						Add Product
					</Button>
				</Row>
				<ProductTable />
			</Card>
			<CommonDrawer
				title="Add New Product"
				visible={isDrawerVisible}
				onClose={() => setDrawerVisible(false)}
			>
				<AddProduct />
			</CommonDrawer>
		</section>
	);
};

export default ManageProducts;
