import { Icon } from '@iconify/react';
import { Button, Flex, Popconfirm, Spin, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { capitalizeString, getColorForInitial, truncateString } from 'nhb-toolbox';
import { Fragment } from 'react';
import {
	useDeactivateUserMutation,
	useGetAllUsersQuery,
	useReactivateUserMutation,
} from '../../../app/api/userAdminApi';
import AntdImage from '../../../components/AntdImage';
import AntdTable from '../../../components/AntdTable';
import { useNotifyResponse } from '../../../hooks/useNotifyResponse';
import { useTheme } from '../../../hooks/useTheme';
import type { ISingleUser } from '../../../types/user.types';
import { formatDateTimeDynamic, getTimeStamp } from '../../../utils/dates';
import { generateFilters, getImageLink } from '../../../utils/helpers';

const UsersTable = () => {
	const { isDarkTheme } = useTheme();
	const { handleError, handleSuccess } = useNotifyResponse();

	const { data, isLoading: isUsersLoading } = useGetAllUsersQuery();

	const [deactivateUser] = useDeactivateUserMutation();
	const [reactivateUser] = useReactivateUserMutation();

	const handleDeactivateUser = async (id: string) => {
		try {
			const res = await deactivateUser(id).unwrap();

			if (res.success) {
				handleSuccess(res);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const handleReactivateUser = async (id: string) => {
		try {
			const res = await reactivateUser(id).unwrap();

			if (res.success) {
				handleSuccess(res);
			}
		} catch (error) {
			handleError(error);
		}
	};

	const UsersColumn: ColumnsType<ISingleUser> = [
		{
			title: 'User Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a, b) => a.name.localeCompare(b.name),
			render: (name: string, user) => (
				<Flex align="center" gap={6}>
					<AntdImage
						width={40}
						height={40}
						src={getImageLink(user.image)}
						alt={user.name}
						style={{
							border: '5px solid red',
						}}
					/>
					<Tooltip title={name}>
						<span style={{ fontWeight: 'bold' }}>
							{name.length > 24 ? truncateString(name, 24) : name}
						</span>
					</Tooltip>
				</Flex>
			),
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			filters: generateFilters(data?.data as ISingleUser[], 'role'),
			onFilter: (value, user) => user.role === value,
			sorter: (a, b) => a.role.localeCompare(b.role),
			render: (role: string) => (
				<Tag
					style={{
						borderColor: getColorForInitial(role, 40),
						color: isDarkTheme ? 'white' : getColorForInitial(role),
					}}
					color={
						isDarkTheme
							? getColorForInitial(role, 25)
							: getColorForInitial(role, 10)
					}
				>
					{capitalizeString(role, { capitalizeEachFirst: true })}
				</Tag>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			sorter: (a, b) => a.email.localeCompare(b.email),
		},
		{
			title: 'Status',
			dataIndex: 'isActive',
			key: 'isActive',
			sorter: (a, b) => String(a.isActive).localeCompare(String(b.isActive)),
			filters: generateFilters(data?.data as ISingleUser[], 'isActive'),
			onFilter: (value, user) => user.isActive === value,
			render: (isActive: boolean) => (
				<Tag color={isActive ? 'green' : 'red'}>
					{isActive ? 'Active' : 'Deactivated'}
				</Tag>
			),
		},
		{
			title: 'Account Created',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (createdAt: string) => formatDateTimeDynamic(createdAt),
			sorter: (a, b) => getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt),
		},
		{
			title: 'Last Updated',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
			render: (updatedAt: string) => formatDateTimeDynamic(updatedAt),
			sorter: (a, b) => getTimeStamp(a.createdAt) - getTimeStamp(b.createdAt),
		},
		{
			title: 'Actions',
			dataIndex: '_id',
			key: '_id',
			render: (id: string, user) => {
				return user.role === 'admin' ? (
					<Flex justify="center" align="center">
						<Tooltip title="Not Allowed">
							<Icon icon="guidance:forbidden" width={24} />
						</Tooltip>
					</Flex>
				) : (
					<Flex justify="center" align="center">
						{user.isActive ? (
							<Tooltip title="Deactivate User">
								<Popconfirm
									onConfirm={() => handleDeactivateUser(id)}
									okText="Yes"
									cancelText="No"
									placement="topRight"
									title={`Deactivate ${user.name}?`}
									description={`Are you sure to deactivate ${user.name}?"`}
								>
									<Button
										danger
										type="text"
										icon={<Icon icon="charm:block" width={24} />}
									/>
								</Popconfirm>
							</Tooltip>
						) : (
							<Tooltip title="Reactivate User">
								<Popconfirm
									onConfirm={() => handleReactivateUser(id)}
									okText="Yes"
									cancelText="No"
									placement="topRight"
									title={`Reactivate ${user.name}?`}
									description={`Are you sure to reactivate ${user.name}?"`}
								>
									<Button
										color="green"
										type="text"
										variant="text"
										icon={<Icon icon="gg:unblock" width={28} />}
									/>
								</Popconfirm>
							</Tooltip>
						)}
					</Flex>
				);
			},
		},
	];

	if (isUsersLoading) {
		return (
			<Flex align="center" justify="center" gap="middle">
				<Spin spinning={isUsersLoading} percent="auto" size="large" />
			</Flex>
		);
	}

	return (
		<Fragment>
			<AntdTable
				data={data?.data}
				columns={UsersColumn}
				searchPlaceholder="Search User"
			/>
		</Fragment>
	);
};

export default UsersTable;
