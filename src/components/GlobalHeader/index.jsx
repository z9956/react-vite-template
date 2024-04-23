import { Layout, Menu } from 'antd';

import styles from './style.module.less';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const items = [
	{
		label: '基础数据',
		key: '1',
		popupClassName: styles.popup,
		route: '/basicData',
		children: [
			{ label: 'BU维护', key: '1-1', route: '/basicData/buMaintenance' },
			{ label: '确权', key: '1-2', route: '/basicData/confirmRights' },
		],
	},
	{
		label: 'BU利润',
		key: '2',
	},
	{
		label: '往来事项',
		key: '3',
		popupClassName: styles.popup,
		children: [
			{ label: '预支', key: '3-1' },
			{ label: '调减', key: '3-2' },
			{ label: '融资', key: '3-3' },
			{ label: '分配', key: '3-4' },
		],
	},
	{
		label: '分红计算',
		key: '4',
	},
];

const GlobalHeader = () => {
	const navigate = useNavigate();

	const handleSelect = ({ item }) => {
		if (item?.route) navigate(item.route);
	};

	return (
		<div className={styles.wrap}>
			<Header className={styles.header}>
				<Menu mode="horizontal" onSelect={handleSelect} items={items} />
			</Header>
			<div className={styles.user}>user</div>
		</div>
	);
};

export default GlobalHeader;
