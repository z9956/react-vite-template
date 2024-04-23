import React, { useEffect, useState } from 'react';
import {
	Card,
	Button,
	Table,
	message,
	Form,
	Row,
	Col,
	Select,
	Input,
	Modal,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { formatMessage } from 'umi-plugin-react/locale';

import // createUserAccounts,
// deleteUserAccounts,
// getAccountsCodeAll,
// getOuterDepartmentList,
// getUserAccountsList,
// getCompanyOuterAll,
// getDepartmentCompany,
// getDepartmentList,
'../../api/basicData.js';
import { DEFAULT_PAGINATION } from '../../utils/constant.js';
import styles from './style.module.less';

const { Option } = Select;
const SettlementAuthority = () => {
	const [dataSource, setDataSource] = useState([]);
	const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showLoading, setShowLoading] = useState(true);
	const [accountsList, setAccountsList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [departList, setDepartList] = useState([]);
	const [officeCodeList, setOfficeCodeList] = useState([]);
	const [officeCodes, setOfficeCodes] = useState([]);
	const [allDeparts, setAllDeparts] = useState([]);

	const [form] = Form.useForm();

	const columns = [
		{
			title: formatMessage({ id: 'settlementAuthority.officeCode' }),
			dataIndex: 'officeCode',
			width: 130,
			align: 'center',
			render: (text) =>
				officeCodes.find((item) => item.code === text)?.nameCn ?? text,
		},
		{
			title: formatMessage({ id: 'settlementCharge.deptName' }),
			dataIndex: 'deptCode',
			width: 150,
			align: 'center',
			render: (record) =>
				allDeparts.find((item) => item.code === record)?.name ?? record,
		},
		{
			title: formatMessage({ id: 'settlementAuthority.userName' }),
			dataIndex: 'userName',
			width: 100,
			align: 'center',
		},
		{
			title: formatMessage({ id: 'settlementAuthority.accountsCode' }),
			dataIndex: 'accountsCode',
			width: 100,
			align: 'center',
		},

		{
			title: formatMessage({ id: 'configuration.createdBy' }),
			dataIndex: 'createdBy',
			width: 150,
			align: 'center',
		},
		{
			title: formatMessage({ id: 'configuration.createdTime' }),
			dataIndex: 'createdTime',
			width: 180,
			align: 'center',
			render: (record) => (
				<span>
					{record ? moment(record).format('YYYY-MM-DD HH:mm:ss') : null}
				</span>
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

		try {
			const values = form.getFieldsValue();
			const params = { ...pagination, ...nextPagination, ...values };
			delete params.total;

			const result = await getUserAccountsList(params);

			if (result) {
				setDataSource([...result.data]);
				setPagination((prevState) => {
					return {
						...prevState,
						total: result.totalCount,
					};
				});
			}
		} catch (e) {
			console.error('configuration getData error', e);
		}

		setShowLoading(false);
	};

	const handleSelectRows = (nextSelectedRowKeys, nextSelectedRows) => {
		setSelectedRowKeys(nextSelectedRowKeys);
	};

	const handleDelete = () => {
		Modal.confirm({
			content: formatMessage({ id: 'settlementBilling.confirm_delete' }),
			autoFocusButton: 'cancel',
			onOk: async () => {
				try {
					if (!selectedRowKeys.length) return;

					const result = await deleteUserAccounts(selectedRowKeys);

					if (result) {
						selectedRowKeys.forEach((id) => {
							const index = dataSource.findIndex((item) => item.id === id);
							dataSource.splice(index, 1);
						});

						setDataSource([...dataSource]);
						setPagination((prevState) => {
							const total = prevState.total - selectedRowKeys.length;

							return {
								...prevState,
								total: total ? total : 0,
							};
						});
						setSelectedRowKeys([]);
						message.success('删除成功');
					}
				} catch (e) {
					console.error('configuration delete error', e);
				}
			},
		});
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

	const handleAdd = async (params) => {
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
			console.error('closeAccount handleAdd', e);
		}
	};

	const getAccounts = async () => {
		try {
			const results = await getAccountsCodeAll();

			if (results) setAccountsList(results);
		} catch (e) {
			console.error('getAccounts error', e);
		}
	};

	const handleSelectOfficeCode = (code) => {
		form.setFieldsValue({ deptCode: '' });

		if (code) {
			const coId = officeCodes.find((item) => item.code === code)?.id;

			if (coId) {
				getDepartmentList({ coId }).then((res) => {
					setDepartList(Array.isArray(res?.data) ? res.data : []);
				});
			} else {
				setDepartList([]);
			}
		}
	};

	useEffect(() => {
		getAccounts();
		getAllUsers();
		getData(pagination);
	}, []);

	useEffect(() => {
		getCompanyOuterAll().then((res) => {
			if (Array.isArray(res?.data)) {
				setOfficeCodes(res.data);
			}
		});

		getOuterDepartmentList().then((res) => {
			if (Array.isArray(res?.data)) {
				setAllDeparts(res.data);
			}
		});
	}, []);

	useEffect(() => {
		getDepartmentCompany().then((res) => {
			setOfficeCodeList(Array.isArray(res?.data) ? res.data : []);
		});
	}, []);

	return (
		<PageHeaderWrapper title={false}>
			<Card>
				<Form form={form}>
					<Row>
						<Col span={6}>
							<Form.Item
								label={formatMessage({ id: 'settlementCharge.officeCode' })}
								name={'officeCode'}
							>
								<Select
									allowClear
									showSearch
									onChange={handleSelectOfficeCode}
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())
									}
								>
									{officeCodes &&
										officeCodes.map((item) => {
											return (
												<Option key={item.code} value={item.code}>
													{item.nameCn}
												</Option>
											);
										})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label={formatMessage({ id: 'settlementCharge.deptName' })}
								name={'deptCode'}
							>
								<Select allowClear showSearch>
									{departList &&
										departList.map((item) => {
											return (
												<Option key={item.code} value={item.code}>
													{item.name}
												</Option>
											);
										})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label={formatMessage({ id: 'settlementAuthority.userName' })}
								name={'userName'}
							>
								<Input style={{ width: '100%' }} allowClear />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item
								label={formatMessage({
									id: 'settlementAuthority.accountsCode',
								})}
								name={'accountsCode'}
							>
								<Select
									allowClear
									showSearch
									filterOption={(input, option) =>
										option.children.toLowerCase().includes(input.toLowerCase())
									}
								>
									{accountsList &&
										accountsList.map((item) => {
											return (
												<Option key={item.code} value={item.code}>
													{item.nameCn}
												</Option>
											);
										})}
								</Select>
							</Form.Item>
						</Col>
						<Col span={24}>
							<div className={styles.colButton}>
								<Button type={'primary'} onClick={handleSearch}>
									{formatMessage({ id: 'configuration.search' })}
								</Button>
								<Button onClick={handleReset}>
									{formatMessage({ id: 'configuration.reset' })}
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Card>
			<Card>
				<div className={styles.button}>
					{havePermission('add', currentPermissions) && (
						<Button type={'primary'} onClick={() => setShowAddModal(true)}>
							{formatMessage({ id: 'configuration.add' })}
						</Button>
					)}
					{havePermission('delete', currentPermissions) && (
						<Button
							type={'primary'}
							disabled={!selectedRowKeys.length}
							danger
							onClick={handleDelete}
						>
							{formatMessage({ id: 'configuration.delete' })}
						</Button>
					)}
				</div>
			</Card>
			<Card>
				<Table
					rowKey={'id'}
					loading={showLoading}
					columns={columns}
					dataSource={dataSource}
					onChange={handleTableChange}
					rowSelection={{
						onChange: handleSelectRows,
						selectedRowKeys,
					}}
					pagination={{
						showQuickJumper: true,
						showSizeChanger: true,
						current: pagination.page + 1,
						pageSize: pagination.size,
						total: pagination.total,
						showTotal: (total) =>
							`${formatMessage({
								id: 'systrm.table.total',
							})} ${total} ${formatMessage({
								id: 'systrm.table.totaldesc',
							})}`,
					}}
					scroll={{
						x: '100%',
						y: 560,
					}}
				/>
			</Card>
			{/*{showAddModal && (*/}
			{/*	<AddSettlementAuthority*/}
			{/*		officeCodeList={officeCodeList}*/}
			{/*		userList={userList}*/}
			{/*		accountsList={accountsList}*/}
			{/*		handleOk={handleAdd}*/}
			{/*		handleCancel={() => setShowAddModal(false)}*/}
			{/*	/>*/}
			{/*)}*/}
		</PageHeaderWrapper>
	);
};

export default SettlementAuthority;
