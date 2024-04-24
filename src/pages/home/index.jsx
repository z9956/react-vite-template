import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import GlobalHeader from '../../components/GlobalHeader/index.jsx';
import styles from './style.module.less';

const { Content } = Layout;

export default function LoginPage() {
	return (
		<div className={styles.wrap}>
			<GlobalHeader />
			<Content className={styles.content}>
				<Outlet />
			</Content>
		</div>
	);
}
