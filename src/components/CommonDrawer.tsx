import { Drawer } from 'antd';
import { useEffect } from 'react';
import type { TRootState } from '../app/store';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCommonDrawer } from '../app/features/modalSlice';

const CommonDrawer = () => {
	const { title, show, width, content } = useAppSelector(
		(state: TRootState) => state.modal
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			dispatch(setCommonDrawer());
		};
	}, [dispatch]);

	return (
		<Drawer
			title={title}
			styles={{ body: { paddingBottom: 80 } }}
			open={show}
			onClose={() => dispatch(setCommonDrawer())}
			width={window.innerWidth > 1200 ? width : 'auto'}
		>
			{content}
		</Drawer>
	);
};

export default CommonDrawer;
