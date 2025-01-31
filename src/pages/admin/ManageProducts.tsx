import { Button, Card, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import CommonDrawer from '../../components/CommonDrawer';
import AddProduct from './components/AddProduct';

const ManageProducts: React.FC = () => {
	const [isDrawerVisible, setDrawerVisible] = useState(false);

	return (
		<section>
			<Card size="small">
				<Row align="middle" justify="space-between" gutter={[5, 16]}>
					<Col xs={24} sm={24} md={12} lg={6}>
						<Input.Search
							placeholder="Search Product"
							style={{ width: '100%' }}
							// onChange={(e) =>
							// 	setSearchParam({
							// 		...searchParam,
							// 		p_name: e.target.value,
							// 	})
							// }
						/>
					</Col>
					<Col xs={24} sm={24} md={12} lg={6}>
						{/* <RangePicker
							style={{ width: '100%' }}
							onChange={(e: any) => handleDateRangeChange(e)}
						/> */}
					</Col>
					<Col xs={24} sm={24} md={12} lg={6}>
						{/* <SelectCategory handleCategoryChange={handleCategoryChange} /> */}
					</Col>
					<Col xs={24} sm={24} md={12} lg={6} style={{ textAlign: 'right' }}>
						<Button type="primary" onClick={() => setDrawerVisible(true)}>
							Add Product
						</Button>
					</Col>
				</Row>
			</Card>
			<CommonDrawer
				title="Add New Product"
				visible={isDrawerVisible}
				onClose={() => setDrawerVisible(false)}
			>
				<AddProduct/>
			</CommonDrawer>
		</section>
	);
};

export default ManageProducts;
