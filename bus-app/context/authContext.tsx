import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

type AuthData = {
	session: string | null;
	profile: any;
	token: string | null;
	loading: boolean;
	isAdmin: boolean;
	setToken: () => null | string;
	setSesion: () => null | string;
	setProfile: () => null | string;
	logout: () => void;
};

const AuthContext = createContext<AuthData>({
	session: null,
	loading: true,
	profile: null,
	token: null,
	isAdmin: false,
	setToken: () => null,
	setSesion: () => null,
	setProfile: () => null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSesion] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const accessToken = await AsyncStorage.getItem('accessToken');
			setSesion(accessToken);
			setToken(accessToken);
			if (accessToken) {
				const userinfo = await AsyncStorage.getItem('userInfo');
				const user = JSON.parse(userinfo);
				if (user?.role === 'ADMIN') {
					setIsAdmin(true);
				}
				setProfile(user || null);
			}

			setLoading(false);
		};
		fetchSession();
	}, []);

	const logout = async () => {
		await AsyncStorage.removeItem('accessToken');
		await AsyncStorage.removeItem('userInfo');
		await AsyncStorage.removeItem('refreshToken');
		await AsyncStorage.removeItem('isAppFirstLaunched');
		setToken(null);
		setSesion(null);
		setProfile(null);
	};

	return (
		<AuthContext.Provider
			value={{
				session,
				token,
				setToken,
				setSesion,
				loading,
				profile,
				setProfile,
				isAdmin,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
