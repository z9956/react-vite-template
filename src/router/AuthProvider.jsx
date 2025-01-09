import PropTypes from 'prop-types';

import useAuthStore from '../store/useAuthStore.js';
import { AuthProviderContext } from '../context/AuthContext.js';

export default function AuthProvider({ children }) {
	return (
		<AuthProviderContext.Provider value={useAuthStore()}>
			{children}
		</AuthProviderContext.Provider>
	);
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
