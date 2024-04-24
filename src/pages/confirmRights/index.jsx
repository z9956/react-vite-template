import { useEffect, useState } from 'react';
import { Card, Table, Form, Space } from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import dayjs from 'dayjs';

import { DEFAULT_PAGINATION } from '../../utils/constant.js';
import i18n from '../../i18n/index.js';
import CreateModal from './CreateModal';
import styles from './style.module.less';

const rightColumns = [
	{
		title: '板块',
		dataIndex: 'officeCode',
		width: 130,
		align: 'center',
	},
	{
		title: '公司',
		dataIndex: 'deptCode',
		width: 150,
		align: 'center',
	},
	{
		title: 'BU',
		dataIndex: 'userName',
		width: 100,
		align: 'center',
	},
	{
		title: '分红占比',
		dataIndex: 'userName',
		width: 100,
		align: 'center',
	},
	{
		title: i18n.t('buMaintenance.startTime'),
		dataIndex: 'createdTime',
		width: 180,
		align: 'center',
		render: (record) => (
			<span>{record ? dayjs(record).format('YYYY-MM-DD HH:mm:ss') : null}</span>
		),
	},
];

const SettlementAuthority = () => {
	const [dataSource] = useState([]);
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showLoading, setShowLoading] = useState(true);
	const [, setUserList] = useState([]);

	const [form] = Form.useForm();

	const handleOpenCreate = () => {
		setShowAddModal(true);
	};

	const columns = [
		{
			title: '人员',
			dataIndex: 'officeCode',
			width: 130,
			align: 'center',
		},
		{
			title: '登录方式',
			dataIndex: 'deptCode',
			width: 150,
			align: 'center',
		},
		{
			title: (
				<IoIosAddCircleOutline
					className={styles.create}
					onClick={handleOpenCreate}
				/>
			),
			key: 'action',
			width: 50,
			align: 'center',
			render: () => (
				<Space size="middle">
					<FiEdit />
				</Space>
			),
		},
	];

	const handleTableChange = (nextPagination) => {
		const nextParams = {
			...pagination,
			size: nextPagination.pageSize,
			page: nextPagination.current - 1 ?? 0,
		};

		setPagination(nextParams);
		getData(nextParams);
	};

	const getAllUsers = async () => {
		try {
			const results = await getAllUserList();
			setUserList(results && Array.isArray(results) ? results : []);
		} catch (e) {
			console.error('getAllUsers', e);
		}
	};

	const getData = async (nextPagination) => {
		if (!showLoading) setShowLoading(true);
		if (selectedRowKeys.length) setSelectedRowKeys([]);

		// try {
		// 	const values = form.getFieldsValue();
		// 	const params = { ...pagination, ...nextPagination, ...values };
		// 	delete params.total;
		//
		// 	const result = await getUserAccountsList(params);
		//
		// 	if (result) {
		// 		setDataSource([...result.data]);
		// 		setPagination((prevState) => {
		// 			return {
		// 				...prevState,
		// 				total: result.totalCount,
		// 			};
		// 		});
		// 	}
		// } catch (e) {
		// 	console.error('configuration getData error', e);
		// }

		setShowLoading(false);
	};

	const handleSelectRows = (nextSelectedRowKeys, nextSelectedRows) => {
		setSelectedRowKeys(nextSelectedRowKeys);
	};

	const handleReset = () => {
		form.resetFields();
		setPagination((prevState) => {
			prevState.page = 0;
			return { ...prevState };
		});

		getData();
	};

	const handleSearch = () => {
		form.validateFields().then((values) => {
			setPagination((prevState) => {
				prevState.page = 0;
				return { ...prevState };
			});
			getData();
		});
	};

	const handleCreate = async (params) => {
		if (params.officeCode) {
			params.ids = params.officeCode;
		}

		try {
			const result = await createUserAccounts(params);

			if (result) {
				setShowAddModal(false);
				getData(pagination);
			}
		} catch (e) {
			console.error('closeAccount handleCreate', e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<Card className={styles.wrap}>
				<Table
					className={styles.left}
					rowKey={'id'}
					loading={showLoading}
					columns={columns}
					dataSource={dataSource}
					onChange={handleTableChange}
					// rowSelection={{
					// 	onChange: handleSelectRows,
					// 	selectedRowKeys,
					// }}
					pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						current: pagination.page + 1,
						pageSize: pagination.size,
						total: pagination.total,
						showTotal: (total) =>
							`${i18n.t('table.total')} ${total} ${i18n.t('table.records')}`,
					}}
				/>
				<Table
					className={styles.right}
					rowKey={'id'}
					loading={showLoading}
					columns={rightColumns}
					dataSource={dataSource}
					onChange={handleTableChange}
					// rowSelection={{
					// 	onChange: handleSelectRows,
					// 	selectedRowKeys,
					// }}
					pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						current: pagination.page + 1,
						pageSize: pagination.size,
						total: pagination.total,
						showTotal: (total) =>
							`${i18n.t('table.total')} ${total} ${i18n.t('table.records')}`,
					}}
				/>
			</Card>
			{showAddModal && (
				<CreateModal
					onOk={handleCreate}
					onCancel={() => setShowAddModal(false)}
				/>
			)}
		</div>
	);
};

export default SettlementAuthority;
