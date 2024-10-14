/** @format */

import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonInputPasswordToggle,
	IonPage,
	IonRouterLink,
	IonText,
	IonTitle,
	IonToolbar,
	useIonRouter,
	useIonToast,
} from '@ionic/react'
import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../contexts/AuthContext'

type LoginFormInputs = {
	email: string
	password: string
}

const Login: React.FC = () => {
	const [presentToast] = useIonToast()
	const { setAuth } = useContext<any>(AuthContext)

	const router = useIonRouter()

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginFormInputs>()

	const onSubmit = async (data: LoginFormInputs) => {
		try {
			const response = await axios.request({
				method: 'post',
				url: 'http://192.168.1.100:5000/login',
				data: data,
			})
			console.log(response.data)

			if (response?.status === 200) {
				presentToast({
					message: 'Registration successful!',
					duration: 2000,
					position: 'top',
					color: 'success',
				})
				setAuth({ isLoggedIn: true, ...response.data })
				router.push('/')
			}
		} catch (error: any) {
			console.log('Error during registration:', error)
			let message = 'Registration failed. Please try again.'
			if (error?.response?.status === 400) {
				message = 'Invalid email or password'
			}
			presentToast({
				message,
				duration: 2000,
				position: 'top',
				color: 'danger',
			})
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Login</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className='ion-margin ion-padding-horizontal'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='ion-margin-top'>
						<IonInput
							type='email'
							labelPlacement='stacked'
							placeholder='Enter email'
							label='Email'
							fill='outline'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Enter a valid email',
								},
							})}
						/>
						{errors.email && (
							<IonText color='danger'>
								<p>{errors.email.message}</p>
							</IonText>
						)}
					</div>

					<div className='ion-margin-top'>
						<IonInput
							type='password'
							labelPlacement='stacked'
							label='Password'
							fill='outline'
							placeholder='Enter password'
							{...register('password', {
								required: 'Password is required',
							})}
						>
							<IonInputPasswordToggle color='medium' slot='end'></IonInputPasswordToggle>
						</IonInput>
						{errors.password && (
							<IonText color='danger'>
								<p>{errors.password.message}</p>
							</IonText>
						)}
					</div>

					<IonButton className='ion-margin-top' expand='block' type='submit'>
						Login
					</IonButton>
				</form>

				<div className='ion-margin-top'>
					<IonText>
						Create an account <IonRouterLink routerLink='/register'>Register</IonRouterLink>
					</IonText>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Login
