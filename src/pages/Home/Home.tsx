import React from 'react';
import { Button } from 'antd';
import AntNotifications from '../../main';
import { selectUser, selectToken } from '../../app/features/authSlice';
import { useAppSelector } from '../../app/hooks';

const Home: React.FC = () => {
	const { notify, toastify, modal } = AntNotifications(true);

	const user = useAppSelector(selectUser);
	const token = useAppSelector(selectToken);

	console.log({ user, token });

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
		</section>
	);
};

export default Home;
