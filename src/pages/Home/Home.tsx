import { useGetAllProductsQuery } from '../../app/api/productApi';
import ProductsGrid from '../../components/ProductsGrid';

const Home: React.FC = () => {
	const { products, isLoading } = useGetAllProductsQuery(
		{ page: 1, limit: 12 },
		{
			selectFromResult: ({ data, ...rest }) => ({
				products: data?.data?.products,
				...rest,
			}),
		}
	);

	return (
		<section>
			<ProductsGrid isLoading={isLoading} products={products} skeletonCount={12} />
		</section>
	);
};

export default Home;
