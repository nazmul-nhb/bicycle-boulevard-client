import { Button } from 'antd';
import React, { useState } from 'react';
import { selectUser, selectToken } from '../../app/features/authSlice';
import { useAppSelector } from '../../app/hooks';
import CommonDrawer from '../../components/CommonDrawer';
import CommonModal from '../../components/CommonModal';
import { AntNotifications } from '../../App';

const Home: React.FC = () => {
	const { notify, toastify, modal } = AntNotifications(true);

	const user = useAppSelector(selectUser);
	const token = useAppSelector(selectToken);

	console.log({ user, token });

	const [isDrawerVisible, setDrawerVisible] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
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
			<Button onClick={() => setDrawerVisible(true)} type="primary">
				Open Drawer
			</Button>
			<Button onClick={() => setModalVisible(true)} danger>
				Open Modal
			</Button>
			<CommonDrawer
				title="My Drawer"
				visible={isDrawerVisible}
				onClose={() => setDrawerVisible(false)}
			>
				<p>This is the drawer content.</p>
			</CommonDrawer>

			<CommonModal
				title="My Modal"
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
			>
				<p>This is the modal content.</p>
			</CommonModal>
		</section>
	);
};

export default Home;
