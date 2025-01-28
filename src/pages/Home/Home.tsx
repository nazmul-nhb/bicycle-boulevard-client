import React from 'react';
import { Button } from 'antd';
import AntNotifications from '../../main';
import { selectUser, selectToken } from '../../app/features/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCommonDrawer } from '../../app/features/modalSlice';

const Home: React.FC = () => {
	const { notify, toastify, modal } = AntNotifications(true);

	const user = useAppSelector(selectUser);
	const token = useAppSelector(selectToken);

	console.log({ user, token });

	const dispatch = useAppDispatch();

	return (
		<section>
			<Button onClick={() => toastify.error('Hello Toast!')} type="default">
				Toast
			</Button>
			<Button
				onClick={() => notify.success({ message: 'Hello Notification!' })}
				type="default"
			>
				Notify
			</Button>
			<Button
				onClick={() =>
					modal.error({
						title: 'Modal',
						content: 'This is Modal!',
						cancelText: 'Cancel',
						closable: true,
					})
				}
				type="default"
			>
				Show Modal
			</Button>
			<Button
				onClick={() =>
					dispatch(
						setCommonDrawer({
							title: 'Hello World',
							content: 'Hello Drawer',
							show: true,
						})
					)
				}
				type="primary"
			>
				Open Drawer
			</Button>
		</section>
	);
};

export default Home;
