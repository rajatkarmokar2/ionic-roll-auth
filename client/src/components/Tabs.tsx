/** @format */

import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	useIonRouter,
} from '@ionic/react'
import { grid, gridOutline, home, homeOutline, settings, settingsOutline } from 'ionicons/icons'
import { FC, useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import PrivateRoute from '../routes/PrivateRoute'

const Tabs: FC = () => {
	const router = useIonRouter()
	const { auth } = useContext(AuthContext)
	const [pathname, setPathname] = useState('')
	const icons = {
		home: pathname === '/tabs/home' ? home : homeOutline,
		dashboard: pathname === '/tabs/dashboard' ? grid : gridOutline,
		settings: pathname === '/tabs/settings' ? settings : settingsOutline,
	}

	useEffect(() => {
		setPathname(router.routeInfo.pathname)
	}, [router.routeInfo.pathname])
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route exact path='/tabs/home' component={Home} />
				<PrivateRoute
					exact
					restricted={auth.roll !== 'ADMIN'}
					path='/tabs/dashboard'
					component={Dashboard}
				/>
				<Route exact path='/tabs/settings' component={Settings} />
				<Route exact path='/tabs' render={() => <Redirect to='/tabs/home' />} />
			</IonRouterOutlet>
			<IonTabBar slot='bottom'>
				<IonTabButton tab='home' href='/tabs/home'>
					<IonIcon aria-hidden='true' icon={icons.home} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				{auth?.roll === 'ADMIN' && (
					<IonTabButton tab='dashboard' href='/tabs/dashboard'>
						<IonIcon aria-hidden='true' icon={icons.dashboard} />
						<IonLabel>Dashboard</IonLabel>
					</IonTabButton>
				)}
				<IonTabButton tab='settings' href='/tabs/settings'>
					<IonIcon aria-hidden='true' icon={icons.settings} />
					<IonLabel>Settings</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}

export default Tabs
