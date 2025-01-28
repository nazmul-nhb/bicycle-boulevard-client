import { Modal } from 'antd';
import Draggable from 'react-draggable';
import { useRef, useState, type FC, type ReactNode } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';

interface Props {
	title: string;
	children: ReactNode;
	visible: boolean;
	width?: number | string;
	onClose: () => void;
}

const CommonModal: FC<Props> = ({ title, children, visible, width = 540, onClose }) => {
	const draggleRef = useRef<HTMLDivElement>(null);
	const [disabled, setDisabled] = useState(true);

	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});

	const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}

		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	return (
		<Modal
			title={
				<div
					style={{ width: '100%', cursor: 'move', padding: '2px 0' }}
					onMouseOver={() => {
						if (disabled) {
							setDisabled(false);
						}
					}}
					onMouseOut={() => {
						setDisabled(true);
					}}
				>
					{title}
				</div>
			}
			open={visible}
			onCancel={onClose}
			footer={false}
			width={window.innerWidth > 1200 ? width : 'auto'}
			modalRender={(modal) => (
				<Draggable
					disabled={disabled}
					bounds={bounds}
					nodeRef={draggleRef}
					onStart={(event, uiData) => onStart(event, uiData)}
				>
					<div ref={draggleRef}>{modal}</div>
				</Draggable>
			)}
		>
			{children}
		</Modal>
	);
};

export default CommonModal;
