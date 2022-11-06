import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useEffect } from 'react';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
	const auth = getAuth(app);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const verifyEmail = () => {
		return sendEmailVerification(auth.currentUser);
	};
	const updateUserProfile = (profileData) => {
		return updateProfile(auth.currentUser, profileData);
	};
	const loginUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	const providerLogin = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};
	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser === null || currentUser.emailVerified) {
				setUser(currentUser);
			}
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, [auth]);
	const authInfo = {
		user,
		loading,
		setLoading,
		createUser,
		verifyEmail,
		updateUserProfile,
		loginUser,
		providerLogin,
		logOut,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
