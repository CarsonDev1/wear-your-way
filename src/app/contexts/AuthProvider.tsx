'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (tokens: { accessToken: string; refreshToken: string }) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// Kiểm tra nếu đang chạy trên client mới dùng localStorage
	const [isAuthenticated, setIsAuthenticated] = useState(
		typeof window !== 'undefined' && !!localStorage.getItem('accessToken')
	);

	const login = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			setIsAuthenticated(true);
		}
	};

	const logout = () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			setIsAuthenticated(false);
		}
	};

	return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
