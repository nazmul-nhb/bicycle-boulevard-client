import { Icon } from '@iconify/react';
import {
	Badge,
	Button,
	Card,
	Col,
	Divider,
	Empty,
	Flex,
	InputNumber,
	Row,
	Space,
	Tag,
	Typography,
} from 'antd';
import { getColorForInitial } from 'nhb-toolbox';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AntNotifications } from '../../App';
import { useGetSingleProductQuery } from '../../app/api/productApi';
import { addToCart, selectTargetItem } from '../../app/features/cartSlice';
import { addToOrder } from '../../app/features/orderSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AntdImage from '../../components/AntdImage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { IProductDetails } from '../../types/product.types';
import type { IErrorResponse } from '../../types/server.types';
import { getImageLink, isFetchError } from '../../utils/helpers';
import ProductDetailsSkeleton from './components/ProductDetailsSkeleton';

const { Title, Text } = Typography;

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { notify } = AntNotifications(true);
	const dispatch = useAppDispatch();

	const isMobile = useMediaQuery(768);
	const targetItem = useAppSelector((state) => selectTargetItem(state, id!));
	const [quantity, setQuantity] = useState(1);

	const { product, isLoading, isError, error } = useGetSingleProductQuery(id, {
		skip: !id,
		selectFromResult: ({ data, ...rest }) => ({
			product: data?.data,
			...rest,
		}),
	});

	if (!id || isLoading || (!product && !isError)) return <ProductDetailsSkeleton />;

	// if (!product && !isLoading) {
	// 	return (
	// 		<Empty
	// 			image={Empty.PRESENTED_IMAGE_SIMPLE}
	// 			description="No Products Found!"
	// 			style={{ marginTop: 40 }}
	// 		/>
	// 	);
	// }

	const {
		_id,
		name,
		price,
		brand,
		category,
		image,
		inStock,
		quantity: stock,
		description,
	} = product || ({} as IProductDetails);

	const remainingStock = (stock || 0) - (targetItem?.cartQuantity ?? 0);

	const handleQuantityChange = (value: number) => {
		if (value < 1) {
			return notify.warning({
				message: 'Cannot add less than 1 item in the cart!',
			});
		}

		if (value > remainingStock) {
			setQuantity(remainingStock);
			return notify.warning({ message: 'Cannot add more than available stock!' });
		}

		setQuantity(value);
	};

	const addProductToCart = () => {
		if ((targetItem?.cartQuantity ?? 0) + quantity > (stock || 0)) {
			return notify.warning({ message: 'Cannot add to cart! Out of Stock!' });
		}

		dispatch(addToCart({ id, cartQuantity: quantity }));
		notify.success({ message: `${name} added to cart!` });
	};

	const buyNow = () => {
		if (remainingStock <= 0) {
			return notify.warning({ message: 'Cannot buy now! Out of Stock!' });
		}

		const productToAdd = {
			_id,
			name,
			brand,
			category,
			image,
			inStock,
			price,
			quantity,
			cartQuantity: quantity,
			cartDate: new Date().toISOString(),
		};

		dispatch(addToOrder(productToAdd));

		navigate(`/checkout`);
	};

	if (isError) {
		return (
			<Empty
				image={Empty.PRESENTED_IMAGE_DEFAULT}
				description={
					isFetchError(error)
						? (error.data as IErrorResponse)?.message
						: 'Something Went Wrong!'
				}
				style={{ marginTop: 40 }}
			/>
		);
	}

	return (
		<Card
			style={{
				width: '100%',
				padding: isMobile ? 16 : 24,
				borderRadius: 8,
				boxShadow: '4px 8px 8px rgba(0, 0, 0, 0.5)',
			}}
		>
			<Row gutter={[24, 24]} align="top">
				<Col xs={24} md={10}>
					<Badge.Ribbon
						color={remainingStock ? 'default' : 'red'}
						text={remainingStock ? 'Available' : 'Out of Stock'}
					>
						<AntdImage
							src={getImageLink(image!)}
							alt={name!}
							aspectRatio={1}
							objectFit="cover"
							disableScaling
						/>
					</Badge.Ribbon>
				</Col>

				<Col xs={24} md={14}>
					<Title level={3}>{name}</Title>
					{/* <Flex align="center" justify="space-between"> */}
					<Text type="secondary">
						<Tag color={getColorForInitial(brand!)}>Brand: {brand}</Tag>
					</Text>
					<Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
						<Tag color={getColorForInitial(category!)}>
							Category: {category}
						</Tag>
					</Text>
					{/* </Flex> */}
					<Divider />
					<Flex
						style={{
							flexDirection: isMobile ? 'column' : 'row',
						}}
						align={isMobile ? 'start' : 'center'}
						gap={16}
						// justify="space-between"
					>
						<Text strong style={{ fontSize: '1.5rem', color: '#d32f2f' }}>
							BDT {price?.toFixed(2)}
						</Text>
						<Tag
							style={{
								fontSize: '1rem',
								// marginTop: 12,
							}}
							color={remainingStock ? 'green' : 'red'}
						>
							Available:{' '}
							<Badge
								showZero
								count={remainingStock}
								overflowCount={remainingStock}
								style={{
									backgroundColor: 'rgba(0, 0, 0, 0)',
									fontSize: '0.9rem',
									fontWeight: 'bold',
									marginTop: -2,
									// opacity: 0.75,
									color: remainingStock ? 'green' : 'red',
									borderColor: 'rgba(0, 0, 0, 0)',
								}}
							/>
						</Tag>
					</Flex>

					<Divider />
					<Flex
						style={{
							flexDirection: isMobile ? 'column' : 'row',
						}}
						align={isMobile ? 'start' : 'center'}
						gap={16}
						// justify="space-between"
					>
						<Space>
							<Button
								icon={<Icon icon="ant-design:minus-circle-outlined" />}
								onClick={() => handleQuantityChange(quantity - 1)}
								// disabled={quantity <= 1}
							/>
							<InputNumber
								min={1}
								max={remainingStock}
								value={quantity}
								onChange={(e) => handleQuantityChange(Number(e))}
								style={{ width: 60, textAlign: 'center' }}
							/>
							<Button
								icon={<Icon icon="ant-design:plus-circle-outlined" />}
								onClick={() => handleQuantityChange(quantity + 1)}
								// disabled={quantity >= remainingStock}
							/>
						</Space>
						<Space>
							<Button
								type="primary"
								onClick={addProductToCart}
								danger={remainingStock <= 0}
								icon={<Icon icon="ant-design:shopping-cart-outlined" />}
								// disabled={remainingStock <= 0}
							>
								Add to Cart
							</Button>
							<Button
								type="primary"
								onClick={buyNow}
								// disabled={remainingStock <= 0}
							>
								Buy Now
							</Button>
						</Space>
					</Flex>

					<Divider />
					{description && (
						<Space direction="vertical">
							<Title level={2}>Product Details</Title>
							<div
								style={{
									marginLeft: 16,
								}}
								dangerouslySetInnerHTML={{ __html: description }}
							/>
						</Space>
					)}
				</Col>
			</Row>
		</Card>
	);
};

export default ProductDetails;
