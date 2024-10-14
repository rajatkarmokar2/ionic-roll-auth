/** @format */

import { FC, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const initAuth = {
	isLoggedIn: false,
	token: '',
	name: '',
	email: '',
	roll: '',
}

const AuthProvider: FC<any> = ({ children }) => {
	let localAuth = initAuth
	try {
		if (JSON.parse(localStorage.getItem('auth')!))
			localAuth = JSON.parse(localStorage.getItem('auth')!)
		else {
			new Error('auth not found')
		}
	} catch (error) {
		localStorage.setItem('auth', JSON.stringify(initAuth))
	}

	const [auth, setAuth] = useState<any>(localAuth)

	useEffect(() => {
		localStorage.setItem('auth', JSON.stringify(auth))
	}, [auth])

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthProvider
