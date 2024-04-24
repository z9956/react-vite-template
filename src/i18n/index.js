import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from './locales/zh_CN.json';
import en from './locales/en_US.json';

const resources = {
	zhCN: {
		translation: zh,
	},
	en: {
		translation: en,
	},
};

const language = localStorage.getItem('language');
i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		lng: language ?? 'zhCN',
		resources,
	});

export default i18n;
