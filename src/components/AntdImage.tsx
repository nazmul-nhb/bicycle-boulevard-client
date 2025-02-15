import { Icon } from '@iconify/react';
import { Image as AntImage, Button, Descriptions, Flex, Typography } from 'antd';
import type { ImageProps } from 'antd/es/image';
import type { Property } from 'csstype';
import { truncateString } from 'nhb-toolbox';
import React, { useEffect, useState } from 'react';
import CommonModal from './CommonModal';

interface Props extends ImageProps {
	/** The URL or path to the image. */
	src: string;
	/** The alt text for the image. */
	alt: string;
	/** How the image will be fit. Default is `cover`. */
	objectFit?: Property.ObjectFit;
	/** Optional aspect ratio for the image. Default is `auto`. */
	aspectRatio?: Property.AspectRatio;
}

/** * Reusable Image Viewer Component with ant-design. */
const AntdImage: React.FC<Props> = ({
	src,
	alt,
	objectFit = 'cover',
	aspectRatio = 'auto',
	...props
}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [imageInfo, setImageInfo] = useState<{
		width: number | string;
		height: number | string;
	}>({ width: 'Unknown', height: 'Unknown' });

	const handleDownload = () => {
		const filename = src.split('/').reverse()[0];

		fetch(src)
			.then((response) => response.blob())
			.then((blob) => {
				const blobUrl = URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = blobUrl;
				link.download = filename;
				document.body.appendChild(link);
				link.click();
				URL.revokeObjectURL(blobUrl);
				link.remove();
			});
	};

	const handleImageInfo = () => {
		setIsModalVisible(true);
	};

	useEffect(() => {
		const img = new Image();

		img.src = src;

		img.onload = () => {
			setImageInfo({ width: img.width, height: img.height });
		};
	}, [src]);

	useEffect(() => {
		const handleScroll = (event: WheelEvent) => {
			if (document.querySelector('.ant-image-preview-mask')) {
				event.preventDefault();
			}
		};

		window.addEventListener('wheel', handleScroll, { passive: false });

		return () => {
			window.removeEventListener('wheel', handleScroll);
		};
	}, []);

	return (
		<figure
			style={{
				transition: 'transform 0.3s ease-in-out',
			}}
			onMouseEnter={(e) => {
				(e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLElement).style.transform = 'scale(1)';
			}}
		>
			<AntImage
				src={src}
				alt={alt}
				{...props}
				style={{ aspectRatio, objectFit }}
				preview={{
					scaleStep: 0.25,
					minScale: 0.75,
					mask: <Icon icon="mdi:eye" />,
					style: {
						background: 'rgba(0, 0, 0, 0.5)',
						backdropFilter: 'blur(2px)',
					},
					toolbarRender: (originNode, _) => (
						<Flex
							align="center"
							justify="center"
							className="toolbar-wrapper ant-image-preview-operations"
						>
							<Button
								type="text"
								onClick={handleImageInfo}
								className="ant-image-preview-operations-operation"
								icon={
									<Icon
										icon="ant-design:info-circle-outlined"
										fontSize={20}
									/>
								}
							/>
							{originNode}
							<Button
								type="text"
								onClick={handleDownload}
								className="ant-image-preview-operations-operation "
								icon={
									<Icon
										icon="ant-design:download-outlined"
										fontSize={20}
									/>
								}
							/>
						</Flex>
					),
				}}
			/>
			<CommonModal
				title="Image Details"
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			>
				<Descriptions
					column={2}
					bordered
					layout="vertical"
					title={truncateString(alt, 64)}
				>
					<Descriptions.Item span={2} label="URL">
						<Typography.Link copyable>{src}</Typography.Link>
					</Descriptions.Item>
					<Descriptions.Item span={2} label="Description">
						{alt}
					</Descriptions.Item>
					<Descriptions.Item label="Width">{imageInfo.width}px</Descriptions.Item>
					<Descriptions.Item label="Height">
						{imageInfo.height}px
					</Descriptions.Item>
				</Descriptions>
			</CommonModal>
		</figure>
	);
};

export default AntdImage;
