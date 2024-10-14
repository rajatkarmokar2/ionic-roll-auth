/** @format */

import {
	IonAvatar,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonItem,
	IonItemGroup,
	IonLabel,
	IonList,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonRouter,
} from '@ionic/react'
import axios from 'axios'
import { logOut } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Settings: React.FC = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const ionRouter = useIonRouter()

	const onLogout = () => {
		setAuth({
			isLoggedIn: false,
		})
		ionRouter.push('/login')
	}

	const getProfile = async () => {
		try {
			const response = await axios.request({
				method: 'get',
				url: 'http://192.168.1.100:5000/profile',
				headers: {
					'Authorization': 'Bearer ' + auth.token,
				},
			})
			setAuth((ps: any) => ({ ...ps, ...response.data }))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProfile()
	}, [])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Settings</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className='ion-padding'>
				<IonRow className='ion-justify-content-center ion-margin-top'>
					<IonAvatar>
						<IonImg src='https://ionicframework.com/docs/img/demos/avatar.svg' />
					</IonAvatar>
				</IonRow>
				<IonRow className='ion-justify-content-center '>
					<IonText className='ion-text-center'>
						<h1>{auth.name}</h1>
						{/* <h6>{auth.roll}</h6> */}
						<small>{auth.email}</small>
					</IonText>
				</IonRow>
				<IonList lines='none'>
					<IonItem button color='light' onClick={onLogout} className=''>
						<IonIcon color='danger' icon={logOut} className='ion-margin-end' />
						<IonLabel color='danger'>Logout</IonLabel>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	)
}

export default Settings
