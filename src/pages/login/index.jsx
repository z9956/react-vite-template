import { useActionData, useLocation, useNavigation } from 'react-router-dom';
import { Form, Button, Checkbox, Input } from 'antd';

import styles from './style.module.less';

export default function LoginPage() {
	let location = useLocation();
	let params = new URLSearchParams(location.search);
	let from = params.get('from') || '/';

	let navigation = useNavigation();
	let isLoggingIn = navigation.formData?.get('username') != null;

	let actionData = useActionData();

	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className={styles.wrap}>
			{/*<Form*/}
			{/*	name="basic"*/}
			{/*	labelCol={{*/}
			{/*		span: 8,*/}
			{/*	}}*/}
			{/*	wrapperCol={{*/}
			{/*		span: 16,*/}
			{/*	}}*/}
			{/*	initialValues={{*/}
			{/*		remember: true,*/}
			{/*	}}*/}
			{/*	onFinish={onFinish}*/}
			{/*	onFinishFailed={onFinishFailed}*/}
			{/*	autoComplete="off"*/}
			{/*>*/}
			{/*	<Form.Item*/}
			{/*		label="Username"*/}
			{/*		name="username"*/}
			{/*		rules={[*/}
			{/*			{*/}
			{/*				required: true,*/}
			{/*				message: 'Please input your username!',*/}
			{/*			},*/}
			{/*		]}*/}
			{/*	>*/}
			{/*		<Input />*/}
			{/*	</Form.Item>*/}

			{/*	<Form.Item*/}
			{/*		label="Password"*/}
			{/*		name="password"*/}
			{/*		rules={[*/}
			{/*			{*/}
			{/*				required: true,*/}
			{/*				message: 'Please input your password!',*/}
			{/*			},*/}
			{/*		]}*/}
			{/*	>*/}
			{/*		<Input.Password />*/}
			{/*	</Form.Item>*/}

			{/*	<Form.Item*/}
			{/*		name="remember"*/}
			{/*		valuePropName="checked"*/}
			{/*		wrapperCol={{*/}
			{/*			offset: 8,*/}
			{/*			span: 16,*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<Checkbox>Remember me</Checkbox>*/}
			{/*	</Form.Item>*/}

			{/*	<Form.Item*/}
			{/*		wrapperCol={{*/}
			{/*			offset: 8,*/}
			{/*			span: 16,*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<Button type="primary" htmlType="submit">*/}
			{/*			Submit*/}
			{/*		</Button>*/}
			{/*	</Form.Item>*/}
			{/*</Form>*/}

			<Form method="post" replace>
				<input type="hidden" name="redirectTo" value={from} />
				<label>
					Username: <input name="username" />
				</label>{' '}
				<button type="submit" disabled={isLoggingIn}>
					{isLoggingIn ? 'Logging in...' : 'Login'}
				</button>
				{actionData && actionData.error ? (
					<p style={{ color: 'red' }}>{actionData.error}</p>
				) : null}
			</Form>
		</div>
	);
}
