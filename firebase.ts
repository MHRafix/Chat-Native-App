import { getApps, initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
	apiKey: 'AIzaSyD1N6EPesobYqFSSbA7D1IFKpn-Q_lSNyI',
	authDomain: 'signal-1d7b9.firebaseapp.com',
	projectId: 'signal-1d7b9',
	storageBucket: 'signal-1d7b9.appspot.com',
	messagingSenderId: '623555492117',
	appId: '1:623555492117:web:42adf1980a96258a1e911c',
	measurementId: 'G-DXCD7QRDHW',
};

let app;

if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApps();
}

const db = getFirestore(app);
const auth = getAuth();

export { auth, db, createUserWithEmailAndPassword, updateProfile };
