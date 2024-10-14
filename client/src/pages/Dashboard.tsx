/** @format */

import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonToast
} from '@ionic/react'
import { create, trash } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import EditUserModal from '../components/models/EditUserModal'
import { deleteUser, fetchUsers } from '../services/users'

const columns = ['name', 'email', 'roll']

const Dashboard: React.FC = () => {
	const [presentToast] = useIonToast()

	const [users, setUsers] = useState({ data: [] })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [showEditModal, setShowEditModal] = useState(false)
	const [selectedUser, setSelectedUser] = useState(null)

	const getUsers = async () => {
		setLoading(true)
		setError('')
		try {
			const response: any = await fetchUsers()
			setUsers(response.data)
		} catch (error) {
			setError('Failed to fetch users')
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await deleteUser(id)
			presentToast({
				message:'User deleted successfully',
				duration: 2000,
				position: 'top',
				color: 'success',
			})
			getUsers() // Refresh user list
		} catch (error) {
			setError('Failed to delete user')
		}
	}

	const handleEdit = (user: any) => {
		setSelectedUser(user)
		setShowEditModal(true) // Open the modal for editing
	}

	const handleUserUpdated = () => {
		getUsers() // Refresh users after update
		presentToast({
			message:'User updated successfully',
			duration: 2000,
			position: 'top',
			color: 'success',
		})
	}

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Dashboard</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className='ion-padding'>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Dashboard</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonLabel>Users</IonLabel>

				{loading && <p>Loading...</p>}
				{error && <p>{error}</p>}

				<div style={{ overflow: 'auto' }}>
					<table>
						<thead>
							<tr>
								{columns.map((column) => (
									<th key={column}>{column}</th>
								))}
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{users?.data?.map((user: any) => (
								<tr key={user._id} className=''>
									{columns.map((column) => (
										<td key={column}>{user[column]}</td>
									))}
									<td>
										<IonButton
											color='light'
											size='small'
											onClick={() => handleEdit(user)}
										>
											<IonIcon color='secondary' icon={create} />
										</IonButton>
										<IonButton
											color='danger'
											size='small'
											onClick={() => handleDelete(user._id)}
										>
											<IonIcon icon={trash} />
										</IonButton>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Edit User Modal */}
				{selectedUser && (
					<EditUserModal
						isOpen={showEditModal}
						onClose={() => setShowEditModal(false)}
						user={selectedUser}
						onUserUpdated={handleUserUpdated}
					/>
				)}
			</IonContent>
		</IonPage>
	)
}

export default Dashboard
