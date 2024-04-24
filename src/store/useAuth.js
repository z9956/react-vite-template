import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { changeLanguage } from 'i18next';
// import i18n from '../i18n/index.js';

import { login } from '../api/login.js';

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
					// let res = { data: { user: 'test', access_token: '111' } };

					if (params) {
						localStorage.setItem('USER_INFO', JSON.stringify(res.data));
						localStorage.setItem('ACCESS_TOKEN', res.data.access_token);
						set({ user: params.username, isAuthenticated: true });
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
