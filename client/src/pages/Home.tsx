/** @format */

import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react'

const Home: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Home</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen className='ion-padding'>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>Home</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonButton expand='block'>Scan</IonButton>
			</IonContent>
		</IonPage>
	)
}

export default Home
