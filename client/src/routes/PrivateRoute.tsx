/** @format */

import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoute = ({ component: Component, restricted, ...rest }: any) => {
	const { auth } = useContext(AuthContext)
	// console.log('auth: ', auth)

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				auth.isLoggedIn && !restricted ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	)
}

export default PrivateRoute
