import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import useAuthStore from '../store/useAuthStore.js';
import { AuthProviderContext } from '../context/AuthContext.js';

const AuthProvider = memo(({ children }) => {
	const authStore = useAuthStore();
	const contextValue = useMemo(() => authStore, [authStore]);

	return (
		<AuthProviderContext.Provider value={contextValue}>
			{children}
		</AuthProviderContext.Provider>
	);
});

AuthProvider.displayName = 'AuthProvider';

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
