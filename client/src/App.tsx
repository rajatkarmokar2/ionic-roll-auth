/** @format */

import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

import './theme/global.css'

/* Theme variables */
import Tabs from './components/Tabs'
import useExitApp from './hooks/useExitApp'
import Login from './pages/Login'
import Register from './pages/Register'
import PublicRoute from './routes/PublicRoute'
import './theme/variables.css'
import PrivateRoute from './routes/PrivateRoute'
import AuthProvider from './providers/AuthProvider'

setupIonicReact()

const App: React.FC = () => {
	return (
		<IonApp>
			<AuthProvider>
				<IonReactRouter>
					<MainRoutes />
					<Route exact path='*' render={() => <Redirect to='/' />} />
				</IonReactRouter>
			</AuthProvider>
		</IonApp>
	)
}

export default App

const MainRoutes = () => {
	useExitApp()
	return (
		<IonRouterOutlet>
			<PrivateRoute path='/tabs' component={Tabs} />
			<Route exact path='/' render={() => <Redirect to='/tabs' />} />
			<PublicRoute restricted exact path='/login' component={Login} />
			<PublicRoute restricted exact path='/register' component={Register} />
		</IonRouterOutlet>
	)
}
