const fakeAuthProvider = {
	isAuthenticated: false,
	user: null,
	signin(params, callback) {
		fakeAuthProvider.user = params;
		fakeAuthProvider.isAuthenticated = true;
		setTimeout(callback, 100); // fake async
	},
	signout(callback) {
		fakeAuthProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	},
};

export { fakeAuthProvider };
