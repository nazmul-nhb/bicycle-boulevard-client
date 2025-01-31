import { Drawer } from 'antd';
import { type FC, type ReactNode } from 'react';

interface Props {
	title: string;
	children: ReactNode;
	visible: boolean;
	width?: number | string;
	onClose: () => void;
}

const CommonDrawer: FC<Props> = ({ title, children, visible, width = 640, onClose }) => {
	return (
		<Drawer
			title={title}
			open={visible}
			onClose={onClose}
			width={window.innerWidth > 1024 ? width : '75%'}
			styles={{ body: { paddingBottom: 80 } }}
		>
			{children}
		</Drawer>
	);
};

export default CommonDrawer;
