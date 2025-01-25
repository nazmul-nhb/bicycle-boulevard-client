import React from "react";
import { Button } from "antd";
import AntNotifications from "../main";

const Home: React.FC = () => {
	const { notify, toastify, modal } = AntNotifications(true);

	return (
		<section>
			<Button
				onClick={() => toastify.error("Hello Toast!")}
				type="default"
			>
				Toast
			</Button>
			<Button
				onClick={() =>
					notify.success({ message: "Hello Notification!" })
				}
				type="default"
			>
				Notify
			</Button>
			<Button
				onClick={() =>
					modal.error({
						title: "Modal",
						content: "This is Modal!",
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
