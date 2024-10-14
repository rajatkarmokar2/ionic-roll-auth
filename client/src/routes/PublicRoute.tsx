/** @format */

import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
	const { auth } = useContext(AuthContext)

	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route
			{...rest}
			render={(props) =>
				auth.isLoggedIn && restricted ? <Redirect to='/tabs' /> : <Component {...props} />
			}
		/>
	)
}

export default PublicRoute
