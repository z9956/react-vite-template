import request from '../utils/request.js';

export const login = ({
	username,
	password,
	orgId = '1401739099974426625',
}) => {
	return request({
		url: '/auth/oauth/token',
		// url: `/api/oauth/token?grant_type=org&scope=all&username=${username}&password=${password}&orgId=${orgId}&client_id=tl-bms&client_secret=123`,
		method: 'post',
		data: { username, password },
	});
};

// export const login = (params) => {
// 	return request({
// 		url: '/api/auth/oauth/token',
// 		method: 'post',
// 		data: params,
// 		requestType: 'form',
// 	});
// };
