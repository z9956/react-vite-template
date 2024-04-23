import request from '../utils/request.js';

export const login = (params) => {
	return request({
		url: '/api/auth/oauth/token',
		method: 'post',
		data: params,
		requestType: 'form',
	});
};
