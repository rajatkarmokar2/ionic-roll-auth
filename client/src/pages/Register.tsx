/** @format */

import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonPage,
	IonRouterLink,
	IonText,
	IonTitle,
	IonToolbar,
	useIonRouter,
	useIonToast,
} from '@ionic/react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'

type RegisterFormInputs = {
	name: string
	email: string
	password: string
}

const Register: React.FC = () => {
	const router = useIonRouter()
	const [presentToast] = useIonToast()
	const { setAuth } = useContext<any>(AuthContext)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<RegisterFormInputs>()

	const onSubmit = async (data: RegisterFormInputs) => {
		try {
			const response = await axios.request({
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://192.168.1.100:5000/register',
				data: data,
			})
			console.log(response.data)

			if (response?.status === 201) {
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
				message = 'Email already exists'
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
					<IonTitle>Register</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className='ion-margin ion-padding-horizontal'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='ion-margin-top'>
						<IonInput
							type='text'
							labelPlacement='floating'
							label='Name'
							fill='outline'
							{...register('name', {
								required: 'Name is required',
								pattern: {
									value: /^[A-Za-z]+$/i,
									message: 'Enter a valid name',
								},
							})}
						/>
						{errors.name && (
							<IonText color='danger'>
								<p>{errors.name.message}</p>
							</IonText>
						)}
					</div>

					<div className='ion-margin-top'>
						<IonInput
							type='email'
							labelPlacement='floating'
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
							labelPlacement='floating'
							label='Password'
							fill='outline'
							{...register('password', {
								required: 'Password is required',
							})}
						/>
						{errors.password && (
							<IonText color='danger'>
								<p>{errors.password.message}</p>
							</IonText>
						)}
					</div>

					<IonButton className='ion-margin-top' expand='block' type='submit'>
						Create
					</IonButton>
				</form>

				<div className='ion-margin-top'>
					<IonText>
						Already have an account? <IonRouterLink routerLink='/login'>Login</IonRouterLink>
					</IonText>
				</div>
			</IonContent>
		</IonPage>
	)
}

export default Register
