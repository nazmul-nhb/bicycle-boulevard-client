import { Icon } from '@iconify/react';
import { Button, Col, Drawer, Flex, Input, Row, Select, Slider } from 'antd';
import { useState } from 'react';
import { useGetAllProductsQuery } from '../../../app/api/productApi';
import ProductCard from '../../../components/ProductCard';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

const { Search } = Input;
const { Option } = Select;

const Products = () => {
	const { data } = useGetAllProductsQuery({ sortBy: 'createdAt', page: 1, limit: 12 });
	const [visible, setVisible] = useState(false);
	const isMobile = useMediaQuery(768);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<section style={{ margin: '24px auto', position: 'relative' }}>
			<Flex
				align="center"
				justify="end"
				style={{
					position: 'sticky',
					top: '20px',
					right: '20px',
					zIndex: 1000,
					marginBottom: 20,
				}}
			>
				{/* Filter Button */}
				<Button
					type="primary"
					icon={<Icon icon="ant-design:filter-outlined" />}
					onClick={showDrawer}
				>
					Filter
				</Button>
			</Flex>
			{/* Products Grid */}
			<Row gutter={[24, 24]}>
				{data?.data?.map((product) => (
					<Col key={product._id} xs={24} sm={12} md={8} lg={6}>
						<ProductCard product={product} />
					</Col>
				))}
			</Row>

			{/* Drawer for Mobile */}
			<Drawer
				title="Filters"
				placement={isMobile ? 'bottom' : 'left'}
				closable={true}
				onClose={onClose}
				open={visible}
				height="auto"
				// style={{ padding: '20px' }}
			>
				<Search
					placeholder="Search products..."
					onSearch={(value) => console.log(value)}
					style={{ marginBottom: '20px' }}
				/>
				<div style={{ marginBottom: '20px' }}>
					<h4>Price Range</h4>
					<Slider range defaultValue={[20, 50]} />
				</div>
				<div style={{ marginBottom: '20px' }}>
					<h4>Category</h4>
					<Select defaultValue="all" style={{ width: '100%' }}>
						<Option value="all">All</Option>
						<Option value="electronics">Electronics</Option>
						<Option value="clothing">Clothing</Option>
						<Option value="books">Books</Option>
					</Select>
				</div>
				<div>
					<h4>Sort By</h4>
					<Select defaultValue="createdAt" style={{ width: '100%' }}>
						<Option value="createdAt">Newest</Option>
						<Option value="priceAsc">Price: Low to High</Option>
						<Option value="priceDesc">Price: High to Low</Option>
					</Select>
				</div>
			</Drawer>
		</section>
	);
};

export default Products;
