import { Form, Button, Checkbox, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../router/AuthProvider.jsx';
import styles from './style.module.less';

export default function LoginPage() {
	const { signIn } = useAuth();
	const navigate = useNavigate();
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		form.validateFields().then((values) => {
			signIn(values, () => {
				navigate('/', { replace: true });
			});
		});
	};

	return (
		<div className={styles.wrap}>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit" onClick={handleSubmit}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
