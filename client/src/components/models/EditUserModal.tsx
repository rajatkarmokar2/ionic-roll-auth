/** @format */

import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonList,
	IonModal,
	IonSelect,
	IonSelectOption,
	IonTitle,
	IonToolbar,
	useIonToast,
} from '@ionic/react'
import { close } from 'ionicons/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateUser } from '../../services/users'

interface EditUserModalProps {
	isOpen: boolean
	onClose: () => void
	user: any // The user object to be edited
	onUserUpdated: () => void // Callback function to refresh user data after edit
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onUserUpdated }) => {
	const [presentToast] = useIonToast()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		values: {
			name: user?.name || '',
			email: user?.email || '',
			roll: user?.roll || 'USER',
		},
	})

	// This handles form submission and updates the user
	const onSubmit = async (data: any) => {
		setLoading(true)
		setError('')

		try {
			let response = await updateUser(user._id, data) // Update the user with form data
			console.log(response)
			presentToast({ message: 'User updated successfully', duration: 2000, color: 'success' })
			onUserUpdated() // Refresh user data in the parent component
			onClose() // Close the modal after update
			reset() // Reset the form after successful submission
		} catch (error) {
			setError('Failed to update user')
			presentToast({ message: 'Failed to update user', duration: 2000, color: 'danger' })
		} finally {
			setLoading(false)
		}
	}

	const handleClose = () => {
		reset()
		setLoading(false)
		setError('')
		onClose()
	}

	return (
		<IonModal isOpen={isOpen} onDidDismiss={handleClose}>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Edit User</IonTitle>
					<IonButtons slot='end'>
						<IonButton onClick={onClose}>
							<IonIcon icon={close} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className='ion-padding'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<IonList lines='none' className='ion-no-padding'>
						<IonInput
							className='ion-margin-vertical'
							type='text'
							labelPlacement='stacked'
							label='Name'
							fill='outline'
							placeholder='Enter name'
							{...register('name', {
								required: true,
							})}
						/>
						<IonInput
							className='ion-margin-vertical'
							type='email'
							labelPlacement='stacked'
							label='Email'
							fill='outline'
							placeholder='Enter email'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Enter a valid email',
								},
							})}
						/>

						<IonSelect
							className='ion-margin-vertical'
							label='Roll'
							fill='outline'
							placeholder='Select roll'
							labelPlacement='stacked'
							{...register('roll', {
								required: true,
							})}
						>
							<IonSelectOption value='ADMIN'>ADMIN</IonSelectOption>
							<IonSelectOption value='USER'>USER</IonSelectOption>
						</IonSelect>
					</IonList>
					<IonButton type='submit' className='ion-no-margin' expand='full' disabled={loading}>
						{loading ? 'Updating...' : 'Update User'}
					</IonButton>
					{error && <p style={{ color: 'red' }}>{error}</p>}
				</form>
			</IonContent>
		</IonModal>
	)
}

export default EditUserModal
