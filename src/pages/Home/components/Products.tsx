import { Icon } from '@iconify/react';
import {
	Button,
	Col,
	Drawer,
	Empty,
	Flex,
	Input,
	Row,
	Select,
	Skeleton,
	Slider,
} from 'antd';
import { useState } from 'react';
import { useGetAllProductsQuery } from '../../../app/api/productApi';
import ProductCard from '../../../components/ProductCard';
import { categoryOptions, PRODUCT_CATEGORIES } from '../../../configs/constants';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import type { IQueryParams } from '../../../types';
import type { IProduct } from '../../../types/product.types';

const { Search } = Input;
const { Option } = Select;

const Products = () => {
	const isMobile = useMediaQuery(768);
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState<IProduct['category'] | null>(null);
	const [sort, setSort] = useState<Pick<IQueryParams, 'sortBy' | 'sortOrder'>>({
		sortBy: 'createdAt',
		sortOrder: 'desc',
	});

	const { data, isLoading } = useGetAllProductsQuery({
		search,
		category,
		...sort,
		page: 1,
		limit: 12,
	});

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const handleSortChange = (value: string) => {
		const [sortBy, sortOrder] = value.split(':');

		setSort({ sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
	};

	const handleCategoryFilter = (value: IProduct['category']) => {
		if (!Object.values(PRODUCT_CATEGORIES).includes(value)) {
			setCategory(null);
		} else {
			setCategory(value);
		}
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
			{isLoading ? (
				<Row gutter={[24, 24]}>
					{Array.from({ length: 12 }).map((_, index) => (
						<Col key={index} xs={24} sm={12} md={8} lg={6}>
							<Skeleton active={isLoading} />
						</Col>
					))}
				</Row>
			) : data?.data?.length === 0 ? (
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description="No Products Found!"
					style={{ marginTop: 40 }}
				/>
			) : (
				<Row gutter={[24, 24]}>
					{data?.data?.map((product) => (
						<Col key={product._id} xs={24} sm={12} md={8} lg={6}>
							<ProductCard product={product} />
						</Col>
					))}
				</Row>
			)}

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
					allowClear
					placeholder="Search products..."
					onSearch={(value) => setSearch(value)}
					style={{ marginBottom: '20px' }}
				/>
				<div style={{ marginBottom: '20px' }}>
					<h4>Price Range</h4>
					<Slider range defaultValue={[20, 50]} />
				</div>
				<div style={{ marginBottom: '20px' }}>
					<h4>Category</h4>
					<Select
						options={[{ value: null, label: 'All' }, ...categoryOptions]}
						defaultValue={null}
						style={{ width: '100%' }}
						onChange={handleCategoryFilter}
					/>
				</div>
				<div>
					<h4>Sort By</h4>
					<Select
						defaultValue="createdAt:desc"
						style={{ width: '100%' }}
						onChange={handleSortChange}
					>
						<Option value="createdAt:desc">Newest</Option>
						<Option value="createdAt:asc">Oldest</Option>
						<Option value="price:asc">Price: Low to High</Option>
						<Option value="price:desc">Price: High to Low</Option>
					</Select>
				</div>
			</Drawer>
		</section>
	);
};

export default Products;
