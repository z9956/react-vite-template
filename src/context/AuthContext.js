import * as React from 'react';

export const AuthProviderContext = React.createContext();

export function useAuth() {
	return React.useContext(AuthProviderContext);
}
