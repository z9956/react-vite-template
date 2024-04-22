import request from '../utils/request.js';

export const fakeAuthProvider = {
	isAuthenticated: false,
	username: null,
	async signin(username) {
		await request('/auth/oauth/token');

		fakeAuthProvider.isAuthenticated = true;
		fakeAuthProvider.username = username;
	},
	async signout() {
		await new Promise((r) => setTimeout(r, 500)); // fake delay
		fakeAuthProvider.isAuthenticated = false;
		fakeAuthProvider.username = '';
	},
};
