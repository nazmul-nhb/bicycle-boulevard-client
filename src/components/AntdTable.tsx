import { Checkbox, DatePicker, Flex, Input, Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import React, { useMemo, useState } from 'react';
import type { DBItem } from '../types';
import Title from 'antd/es/typography/Title';

dayjs.extend(isBetween);

interface Props<T> {
	data?: T[];
	excludedFields?: (keyof T)[];
	columns: ColumnsType<T>;
	searchPlaceholder: string;
}

const AntdTable = <T extends object & DBItem>({
	data,
	columns,
	searchPlaceholder,
	excludedFields,
}: Props<T>) => {
	const [searchText, setSearchText] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize] = useState<number>(6);
	const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
	const [selectedColumns, setSelectedColumns] = useState<(keyof T)[]>(() => {
		const allColumns = columns.map((col) => col.key as keyof T);
		const defaultExcluded = ['createdAt', 'updatedAt'] as (keyof T)[];
		const excludedSet = new Set([...(excludedFields || []), ...defaultExcluded]);

		return allColumns.filter((key) => !excludedSet.has(key));
	});

	const filteredData = useMemo(() => {
		return data?.filter((item) => {
			const itemValues = Object.values(item);

			const matchesSearch = itemValues.some((value) =>
				value?.toString()?.toLowerCase().includes(searchText.toLowerCase())
			);

			const matchesDateRange = dateRange
				? item.createdAt &&
				  dayjs(item.createdAt).isBetween(dateRange[0], dateRange[1], null, '[]')
				: true;

			return matchesSearch && matchesDateRange;
		});
	}, [data, searchText, dateRange]);

	const handleSearch = (value: string) => {
		setSearchText(value);
		setCurrentPage(1);
	};

	const handleChangePage = (page: number) => {
		setCurrentPage(page);
	};

	const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
		setDateRange(dates);
		setCurrentPage(1);
	};

	const handleColumnChange = (checkedValues: (keyof T)[]) => {
		setSelectedColumns(checkedValues);
	};

	const displayedColumns = columns.filter((col) =>
		selectedColumns.includes(col.key as keyof T)
	);

	const paginatedData = filteredData?.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	return (
		<React.Fragment>
			{/* Column Selector */}
			<Title level={4}>Select Columns</Title>
			<Checkbox.Group
				options={columns.map((col) => ({
					label: col.title as string,
					value: col.key as keyof T,
				}))}
				value={selectedColumns}
				onChange={handleColumnChange}
			/>
			{/* Search, Date Range Select and Pagination */}
			<Flex align="center" justify="space-between" style={{ margin: '16px 0' }}>
				<Input.Search
					placeholder={searchPlaceholder}
					onSearch={handleSearch}
					onChange={(e) => handleSearch(e.target.value)}
					allowClear
					size="middle"
					style={{ width: '240px' }}
				/>
				<DatePicker.RangePicker
					size="middle"
					placeholder={['First Created', 'Last Created']}
					onChange={(e) => handleDateRangeChange(e as [Dayjs, Dayjs])}
					style={{ marginLeft: '16px' }}
				/>
				<Pagination
					current={currentPage}
					total={filteredData?.length}
					pageSize={pageSize}
					onChange={handleChangePage}
				/>
			</Flex>

			<Table
				rowKey="_id"
				columns={displayedColumns}
				dataSource={paginatedData}
				pagination={false}
				scroll={{ x: 'max-content' }}
			/>
		</React.Fragment>
	);
};

export default AntdTable;
