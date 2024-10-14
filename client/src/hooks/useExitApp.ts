/** @format */

import { App } from '@capacitor/app'
import { useIonRouter } from '@ionic/react'
import { useEffect } from 'react'

const useExitApp = () => {
	const ionRouter = useIonRouter()

	useEffect(() => {
		App.addListener('backButton', () => {
			if (
				!ionRouter.canGoBack() ||
				['/login', '/tabs'].includes(ionRouter.routeInfo.pathname) ||
				ionRouter.routeInfo.pathname.startsWith('/tabs/')
			) {
				App.minimizeApp()
			}
		})
		return () => {
			App.removeAllListeners()
		}
	}, [ionRouter?.routeInfo?.pathname])

	return null
}

export default useExitApp
