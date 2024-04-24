import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { MdLanguage } from 'react-icons/md';

import useAuthStore from '../../store/useAuth.js';
import i18n from '../../i18n/index.js';
import styles from './style.module.less';

const { Header } = Layout;

const items = [
	{
		label: i18n.t('nav.basicData'),
		key: '1',
		popupClassName: styles.popup,
		route: '/basicData',
		children: [
			{
				// label: '',
				key: '1-1',
				route: '/basicData/buMaintenance',
				icon: (
					<>
						<Link to={'/basicData/buMaintenance'}>
							{i18n.t('nav.buMaintenance')}
						</Link>
					</>
				),
			},
			{
				// label: i18n.t('nav.confirmRights'),
				key: '1-2',
				route: '/basicData/confirmRights',
				icon: (
					<>
						<Link to={'/basicData/confirmRights'}>
							{i18n.t('nav.confirmRights')}
						</Link>
					</>
				),
			},
		],
	},
	{
		key: '2',
		icon: (
			<>
				<Link to={'/buProfit'}>{i18n.t('nav.bUProfit')}</Link>
			</>
		),
	},
	{
		label: i18n.t('nav.transactions'),
		key: '3',
		popupClassName: styles.popup,
		children: [
			{
				key: '3-1',
				icon: (
					<>
						<Link to={'/advance'}>{i18n.t('nav.advance')}</Link>
					</>
				),
			},
			{
				key: '3-2',
				icon: (
					<>
						<Link to={'/reduce'}>{i18n.t('nav.reduce')}</Link>
					</>
				),
			},
			{
				key: '3-3',
				icon: (
					<>
						<Link to={'/financing'}>{i18n.t('nav.financing')}</Link>
					</>
				),
			},
			{
				key: '3-4',
				icon: (
					<>
						<Link to={'/allocate'}>{i18n.t('nav.allocate')}</Link>
					</>
				),
			},
		],
	},
	{
		key: '4',
		label: i18n.t('nav.dividendCalculation'),
		children: [
			{
				key: '4-1',
				icon: (
					<>
						<Link to={'/plate'}>{i18n.t('nav.plate')}</Link>
					</>
				),
			},
			{
				key: '4-2',
				icon: (
					<>
						<Link to={'/persons'}>{i18n.t('nav.persons')}</Link>
					</>
				),
			},
		],
	},
];

const locales = [
	{
		label: '简体中文',
		value: 'zhCN',
		key: 'zhCN',
	},
	{
		label: 'English',
		value: 'en',
		key: 'en',
	},
];

const GlobalHeader = () => {
	const { user, language, changeLanguage } = useAuthStore();

	const handleChangeLanguage = (nextLang) => {
		changeLanguage(nextLang);
	};

	return (
		<div className={styles.wrap}>
			<Header className={styles.header}>
				<Menu mode="horizontal" items={items} />
			</Header>
			<div className={styles.user}>
				<div className={styles.lang}>
					<MdLanguage />
					<div className={styles.dropdown}>
						{locales.map((item) => {
							return (
								<span
									className={item.value === language ? styles.active : ''}
									onClick={() => handleChangeLanguage(item.value)}
									key={item.key}
								>
									{item.label}
								</span>
							);
						})}
					</div>
				</div>
				<span className={styles.username}>{user}</span>
			</div>
		</div>
	);
};

export default GlobalHeader;
