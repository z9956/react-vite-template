import { useState } from 'react';
import {
	Button,
	Col,
	Form,
	Input,
	Modal,
	Row,
	DatePicker,
	Tabs,
	Table,
	Space,
} from 'antd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { CiCircleMinus } from 'react-icons/ci';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import i18n from '../../../i18n/index.js';
import styles from './style.module.less';

const tabItems = [
	{ label: '分红', key: 'item-1' }, // 务必填写 key
	{ label: '注资', key: 'item-2' },
];

const CreateModal = ({ onCancel, onOk }) => {
	const [form] = Form.useForm();

	const [departList] = useState([]);
	const [dataSource] = useState([]);
	const [showLoading] = useState(false);
	const [, setShowAddModal] = useState(false);
	const [activeKey, setActiveKey] = useState(tabItems[0].key);

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
			title: '分红占比',
			dataIndex: 'deptCode',
			width: 150,
			align: 'center',
		},
		{
			title: '分货开始日期',
			dataIndex: 'createdTime',
			width: 180,
			align: 'center',
			render: (record) => (
				<span>
					{record ? dayjs(record).format('YYYY-MM-DD HH:mm:ss') : null}
				</span>
			),
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
					<CiCircleMinus />
				</Space>
			),
		},
	];
	const injectionColumns = [
		{
			title: '人员',
			dataIndex: 'officeCode',
			width: 130,
			align: 'center',
		},
		{
			title: '注资金额',
			dataIndex: 'deptCode',
			width: 150,
			align: 'center',
		},
		{
			title: '注资币种',
			dataIndex: 'deptCode',
			width: 150,
			align: 'center',
		},
		{
			title: '注资日期',
			dataIndex: 'createdTime',
			width: 180,
			align: 'center',
			render: (record) => (
				<span>
					{record ? dayjs(record).format('YYYY-MM-DD HH:mm:ss') : null}
				</span>
			),
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
					<CiCircleMinus />
				</Space>
			),
		},
	];

	const handleConfirm = () => {
		try {
			form.validateFields().then((values) => {
				const depart = departList.find((item) => item.code === values.deptCode);

				if (depart) {
					values.deptName = depart.name;
				}

				const accountsCodeList = values.accountsCodeList;
				if (accountsCodeList) {
					values.accountsCodeList = [accountsCodeList];
				}

				onOk({ ...values, id: null });
			});
		} catch (e) {
			console.error('CreateModal handleConfirm', e);
		}
	};

	return (
		<Modal
			destroyOnClose
			title={i18n.t('modal.add')}
			open={true}
			onOk={onOk}
			onCancel={onCancel}
			width={600}
			footer={null}
			maskClosable={false}
			className={styles.modal}
		>
			<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
				<Row>
					<Col span={12}>
						<Form.Item
							label={'板块'}
							name={'userName'}
							rules={[{ required: true }]}
						>
							<Input allowClear />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label={'公司'}
							name={'userName'}
							rules={[{ required: true }]}
						>
							<Input allowClear />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label={'BU'}
							name={'userName'}
							rules={[{ required: true }]}
						>
							<Input allowClear />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label={'占股比例'}
							name={'userName'}
							rules={[{ required: true }]}
						>
							<Input allowClear />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label={'开始日期'}
							name={'userName'}
							rules={[{ required: true }]}
						>
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label={'结束日期'}
							name={'userName'}
							rules={[{ required: true }]}
						>
							<DatePicker style={{ width: '100%' }} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Tabs items={tabItems} onChange={(nextKey) => setActiveKey(nextKey)} />
			<Table
				rowKey={'id'}
				loading={showLoading}
				columns={activeKey === tabItems[0].key ? columns : injectionColumns}
				dataSource={dataSource}
				// onChange={handleTableChange}
				// rowSelection={{
				// 	onChange: handleSelectRows,
				// 	selectedRowKeys,
				// }}
				// pagination={{
				// 	showQuickJumper: true,
				// 	showSizeChanger: true,
				// 	current: pagination.page + 1,
				// 	pageSize: pagination.size,
				// 	total: pagination.total,
				// 	showTotal: (total) =>
				// 		`${i18n.t('table.total')} ${total} ${i18n.t('table.records')}`,
				// }}
			/>
			<Row gutter={24}>
				<Col span={24}>
					<div className={styles.bottom}>
						<Button className={styles.save} onClick={handleConfirm}>
							{i18n.t('save')}
						</Button>
						<Button onClick={onCancel}>{i18n.t('cancel')}</Button>
					</div>
				</Col>
			</Row>
		</Modal>
	);
};

CreateModal.propTypes = {
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default CreateModal;
