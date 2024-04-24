import { useEffect, useState } from 'react';
import {
	Card,
	Table,
	Form,
	Space,
	Row,
	Col,
	Input,
	DatePicker,
	Select,
	Button,
} from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import dayjs from 'dayjs';

// import {} form '../../api/basicData.js';
import { DEFAULT_PAGINATION } from '../../utils/constant.js';
import i18n from '../../i18n/index.js';
import CreateModal from './CreateModal';
import styles from './style.module.less';

const SettlementAuthority = () => {
	const [dataSource] = useState([]);
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showLoading, setShowLoading] = useState(true);

	const [form] = Form.useForm();

	const handleOpenCreate = () => {
		setShowAddModal(true);
	};

	const columns = [
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
			title: '合计',
			dataIndex: 'userName',
			width: 100,
			align: 'center',
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
			<Card>
				<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
					<Row>
						<Col span={4}>
							<Form.Item label={'日期'} name={'userName'}>
								<DatePicker style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={4}>
							<Form.Item label={''} name={'userName'}>
								<DatePicker style={{ width: '100%' }} />
							</Form.Item>
						</Col>
						<Col span={4}>
							<Form.Item label={'板块'} name={'userName'}>
								<Select allowClear />
							</Form.Item>
						</Col>
						<Col span={4}>
							<Form.Item label={'BU'} name={'userName'}>
								<Select allowClear />
							</Form.Item>
						</Col>
						<Col span={4}>
							<Button>导入</Button>
							<Button>导出</Button>
						</Col>
					</Row>
				</Form>
			</Card>
			<Card className={styles.wrap}>
				<Table
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
