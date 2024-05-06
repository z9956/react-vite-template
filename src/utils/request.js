import axios from 'axios';
import { notification } from 'antd';

import config from '../config';

const axiosInstance = axios.create({
	baseURL: config.baseUrl,
	timeout: 20000,
});

const warn = (description) => {
	return notification.warning({
		title: '警告',
		description,
	});
};

// request拦截器
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('ACCESS_TOKEN');

		if (token) {
			config.headers['Authorization'] = 'Bearer ' + token;
		}

		if (!config.headers['Content-Type']) {
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/*
 * 响应拦截器，目前的处理是，无论失败或者成功都会返回{ code: xxx, data: xxx }这种类型的数据，没有reject和抛error。
 * 如果有问题，拦截器里会进行提示，然后返回{ code: Xxx, data:xxx }这种数据。在then里面总是会接收到
 * */
axiosInstance.interceptors.response.use(
	(response) => {
		// console.log('response',response)
		/*
		 * 响应成功的拦截器，主要是对data作处理，如果没有返回data，那么会添加一个data字段，并把response.data的内容合并到data里面，然后返回
		 * */
		let { data } = response;
		// console.log(response)
		if (data === undefined || data === null || data === '') {
			warn('请求失败，请稍后重试！');
			return { success: false, code: 500, data: [] };
		} else if (typeof data === 'string') {
			return { success: true, code: 200, data };
		} else {
			if (data.data === undefined || data.data === null) {
				data.data = { ...data };
			}
			let resCode = data.code;
			if (resCode) {
				try {
					resCode = Number(resCode);
				} catch (e) {
					data.code = resCode = 500;
					data.success = false;
				}
				if (resCode === 0) {
					data.code = resCode = 200;
					data.success = true;
				}
				if (resCode !== 200) {
					warn(response.data.message || '请求失败，请稍后重试！');
				} else {
					data.success = true;
				}
			} else {
				data.code = 200;
				data.success = true;
			}
			return data;
		}
	},
	(error) => {
		console.error('error response', error);
		if (error.response === undefined) {
			warn('服务器响应超时');
			return { success: false, code: 500, msg: '服务器响应超时', data: [] };
		}
		if (error.response.status >= 500) {
			warn('服务器出现错误');
			return { success: false, code: 500, msg: '服务器出现错误', data: [] };
		}
		if (error.response.status === 404) {
			warn('接口不存在');
			return { success: false, code: 404, msg: '接口不存在', data: [] };
		}
		if (error.response.status === 400) {
			warn('接口报错');
			return { success: false, code: 400, msg: '接口报错', data: [] };
		}
		if (error.response.status === 401) {
			localStorage.clear();
			sessionStorage.clear();

			warn('TOKEN过期 请重新登录');

			setTimeout(() => {
				window.location.href = '/login';
			}, 300);

			return {
				success: false,
				code: 401,
				msg: 'TOKEN过期 请重新登录',
				data: [],
			};
		} else {
			let { data } = error.response;
			if (data === null || data === undefined) {
				warn('请求失败，请稍后重试！');
				return { success: true, code: 200, data: [] };
			} else {
				let resCode = data.code;
				if (data.data === undefined || data.data === null) {
					data.data = { ...data };
				}
				if (resCode && typeof resCode == 'number' && resCode !== 200) {
					warn('请求失败，请稍后重试！');
				} else {
					data.code = 200;
					data.success = true;
				}
				return data;
			}
		}
	},
);

export default axiosInstance;
