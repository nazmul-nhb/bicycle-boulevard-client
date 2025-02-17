import { Icon } from '@iconify/react';
import { Button, Drawer, Flex, Input, Select, Slider } from 'antd';
import { useMemo, useState } from 'react';
import { useGetAllProductsQuery } from '../../../app/api/productApi';
import ProductsGrid from '../../../components/ProductsGrid';
import { categoryOptions } from '../../../configs/constants';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import useQueryParams from '../../../hooks/useQueryParams';
import type { IQueryParams } from '../../../types';
import type { IProduct } from '../../../types/product.types';
import { debounceAction } from '../../../utils/helpers';

const { Search } = Input;
const { Option } = Select;

const Products = () => {
	const isMobile = useMediaQuery(768);
	const [visible, setVisible] = useState(false);

	const { getQueryParam, setQueryParams, removeQueryParam } = useQueryParams();

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
			page: 1,
			limit: 12,
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
			}, 700),
		[setQueryParams]
	);

	const handlePriceRange = (value: number[]) => {
		setPriceRangeInput([value[0], value[1]]);
		debouncedRangeRange(value);
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
			<ProductsGrid isLoading={isLoading} products={productData?.products} />

			{/* Drawer for Mobile */}
			<Drawer
				title="Filters"
				placement={isMobile ? 'bottom' : 'right'}
				closable={true}
				onClose={closeDrawer}
				open={visible}
				height="auto"
				// style={{ padding: '20px' }}
			>
				<Search
					allowClear
					value={searchInput}
					placeholder="Search products..."
					onSearch={handleSearch}
					onChange={(e) => handleSearch(e.target.value)}
					style={{ marginBottom: '20px' }}
				/>
				<div style={{ marginBottom: '20px' }}>
					<h4>Price Range</h4>
					<Slider
						range
						value={(priceRangeInput as number[]) || [1, 100000]}
						min={productData?.minPrice}
						max={productData?.maxPrice}
						onChange={handlePriceRange}
					/>
				</div>
				<div style={{ marginBottom: '20px' }}>
					<h4>Category</h4>
					<Select
						options={[{ value: 'all', label: 'All' }, ...categoryOptions]}
						defaultValue={category}
						style={{ width: '100%' }}
						onChange={handleCategoryFilter}
					/>
				</div>
				<div>
					<h4>Sort By</h4>
					<Select
						defaultValue={`${sort.sortBy}:${sort.sortOrder}`}
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
