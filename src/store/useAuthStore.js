import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { changeLanguage } from 'i18next';

// import { login } from '../api/login.js';

export const useAuthStore = create(
	persist(
		(set) => ({
			user: null,
			language: 'zhCN',
			isAuthenticated: false,

			changeLanguage: async (nextLang) => {
				if (nextLang) {
					set({ language: nextLang });
					await changeLanguage(nextLang);
					localStorage.setItem('language', nextLang);
					window.location.reload();
				}
			},
			signIn: async (params, cb) => {
				try {
					// const res = await login(params);
					const res = {
						data: {
							accessToken: 'test',
							username: '123',
						},
					};

					if (res) {
						//TODO
						// localStorage.setItem('USER_INFO', JSON.stringify(res.data));
						localStorage.setItem('ACCESS_TOKEN', res.data.accessToken);
						set({ user: res.data.username, isAuthenticated: true });
						// useNavigate('/');
						cb && cb();
					}

					// console.error('res', res);
				} catch (e) {
					console.error('userAuth.js signIn, e', e);
				}
			},
			signOut: async () => {
				set({ user: null, isAuthenticated: false });
				localStorage.clear();
				sessionStorage.clear();
			},
		}),
		{
			name: 'useAuth',
			storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
		},
	),
);

export default useAuthStore;
