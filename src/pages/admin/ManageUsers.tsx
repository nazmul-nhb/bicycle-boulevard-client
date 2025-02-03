import { Card, Row } from 'antd';
import React from 'react';
import AntdBreadcrumb from '../../components/AntdBreadcrumb';
import UsersTable from './components/UsersTable';

const ManageUsers: React.FC = () => {
	return (
		<section>
			<Card size="small">
				<Row align="middle" justify="space-between" gutter={[5, 16]}>
					<AntdBreadcrumb />
				</Row>
				<UsersTable />
			</Card>
		</section>
	);
};

export default ManageUsers;
