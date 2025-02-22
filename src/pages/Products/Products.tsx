import { Icon } from '@iconify/react';
import { Button, Drawer, Flex, Input, Pagination, Select, Slider } from 'antd';
import Title from 'antd/es/typography/Title';
import { useMemo, useState } from 'react';
import { useGetAllProductsQuery } from '../../app/api/productApi';
import ProductsGrid from '../../components/ProductsGrid';
import { categoryOptions } from '../../configs/constants';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import useQueryParams from '../../hooks/useQueryParams';
import type { IQueryParams } from '../../types';
import type { IProduct } from '../../types/product.types';
import { debounceAction } from '../../utils/helpers';

const { Search } = Input;

const sortOptions = [
	{ value: 'createdAt:desc', label: 'Newest' },
	{ value: 'createdAt:asc', label: 'Oldest' },
	{ value: 'price:asc', label: 'Price: Low to High' },
	{ value: 'price:desc', label: 'Price: High to Low' },
];

const Products = () => {
	const isMobile = useMediaQuery(768);
	const [visible, setVisible] = useState(false);

	const { getQueryParam, setQueryParams, removeQueryParam } = useQueryParams();

	const [page, setPage] = useState(Number(getQueryParam('page')) || 1);
	const [limit, setLimit] = useState(Number(getQueryParam('limit')) || 12);

	const [searchInput, setSearchInput] = useState(getQueryParam('search') || '');
	const [search, setSearch] = useState(getQueryParam('search') || '');

	const [category, setCategory] = useState<IProduct['category'] | 'all'>(
		(getQueryParam('category') as IProduct['category']) || 'all'
	);

	const [sort, setSort] = useState<Pick<IQueryParams, 'sortBy' | 'sortOrder'>>({
		sortBy:
			getQueryParam('sort') === 'time'
				? 'createdAt'
				: getQueryParam('sort') || 'createdAt',
		sortOrder: (getQueryParam('order') as IQueryParams['sortOrder']) || 'desc',
	});

	const [priceRange, setPriceRange] = useState<[number | undefined, number | undefined]>([
		Number(getQueryParam('minPrice')) || undefined,
		Number(getQueryParam('maxPrice')) || undefined,
	]);

	const [priceRangeInput, setPriceRangeInput] = useState<
		[number | undefined, number | undefined]
	>([
		Number(getQueryParam('minPrice')) || undefined,
		Number(getQueryParam('maxPrice')) || undefined,
	]);

	const { productData, isLoading } = useGetAllProductsQuery(
		{
			search,
			category: category === 'all' ? '' : category,
			...sort,
			min: priceRange[0],
			max: priceRange[1],
			brand: getQueryParam('brand') || '',
			page,
			limit,
		},
		{
			selectFromResult: ({ data, ...rest }) => ({
				productData: data?.data,
				...rest,
			}),
		}
	);

	const showDrawer = () => {
		setVisible(true);
	};

	const closeDrawer = () => {
		setVisible(false);
	};

	const handleSortChange = (value: string) => {
		const [sortBy, sortOrder] = value.split(':');

		setSort({ sortBy, sortOrder: sortOrder as 'asc' | 'desc' });

		setQueryParams({
			sort: sortBy === 'createdAt' ? 'time' : sortBy,
			order: sortOrder,
		});
	};

	const handleCategoryFilter = (value: typeof category) => {
		setCategory(value);

		if (value === 'all') {
			removeQueryParam('category');
		} else {
			setQueryParams({ category: value });
		}
	};

	const debouncedSearch = useMemo(
		() =>
			debounceAction((value: string) => {
				setSearch(value);
				setQueryParams({ search: value });
			}, 500),
		[setQueryParams]
	);

	const handleSearch = (value: string) => {
		setSearchInput(value);
		debouncedSearch(value);
	};

	const debouncedRangeRange = useMemo(
		() =>
			debounceAction((value: number[]) => {
				setPriceRange([value[0], value[1]]);
				setQueryParams({ minPrice: value[0], maxPrice: value[1] });
			}, 500),
		[setQueryParams]
	);

	const handlePriceRange = (value: number[]) => {
		setPriceRangeInput([value[0], value[1]]);
		debouncedRangeRange(value);
	};

	const handlePagination = (newPage: number, newLimit?: number) => {
		setPage(newPage);
		setLimit(newLimit || limit);

		setQueryParams({
			page: newPage.toString(),
			limit: (newLimit || limit).toString(),
		});
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

			{/* Products Grid with Skeleton and Empty Sign */}
			<div style={{ margin: '20px auto' }}>
				<ProductsGrid
					isLoading={isLoading}
					products={productData?.products}
					skeletonCount={limit}
				/>
			</div>

			<Flex align="center" justify="center" style={{ margin: '20px auto' }}>
				<Pagination
					current={page}
					pageSize={limit}
					pageSizeOptions={[6, 12, 18, 24, 36, 48, 60]}
					total={productData?.total}
					showSizeChanger
					showQuickJumper
					responsive
					onChange={handlePagination}
					showTotal={(total) => `Total ${total} items`}
				/>
			</Flex>

			{/* Drawer for Mobile */}
			<Drawer
				title="Filters"
				placement={isMobile ? 'bottom' : 'right'}
				closable={true}
				onClose={closeDrawer}
				open={visible}
				height="auto"
			>
				<Search
					allowClear
					size="large"
					value={searchInput}
					placeholder="Search products..."
					onSearch={handleSearch}
					onChange={(e) => handleSearch(e.target.value)}
					style={{ marginBottom: '20px' }}
				/>
				<div style={{ marginBottom: '20px' }}>
					<Title level={5}>Price Range</Title>
					<Slider
						step={50}
						range={{ editable: true, minCount: 1, maxCount: 2 }}
						disabled={productData?.minPrice === productData?.maxPrice}
						value={(priceRangeInput as number[]) || [1, 150000]}
						min={productData?.minPrice}
						max={productData?.maxPrice}
						onChange={handlePriceRange}
					/>
				</div>
				<div style={{ marginBottom: '20px' }}>
					<Title level={5}>Category</Title>
					<Select
						size="large"
						options={[{ value: 'all', label: 'All' }, ...categoryOptions]}
						defaultValue={category}
						value={category}
						style={{ width: '100%' }}
						onChange={handleCategoryFilter}
					/>
				</div>
				<div>
					<Title level={5}>Sort By</Title>
					<Select
						size="large"
						defaultValue={`${sort.sortBy}:${sort.sortOrder}`}
						value={`${sort.sortBy}:${sort.sortOrder}`}
						style={{ width: '100%' }}
						options={sortOptions}
						onChange={handleSortChange}
					/>
				</div>
			</Drawer>
		</section>
	);
};

export default Products;
