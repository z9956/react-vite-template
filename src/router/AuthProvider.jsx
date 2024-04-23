import * as React from 'react';
import useAuthStore from '../store/useAuth.js';

export const AuthProviderContext = React.createContext();

export function AuthProvider({ children }) {
	return (
		<AuthProviderContext.Provider value={useAuthStore()}>
			{children}
		</AuthProviderContext.Provider>
	);
}

export function useAuth() {
	return React.useContext(AuthProviderContext);
}
