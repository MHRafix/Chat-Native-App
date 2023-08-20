import { Button, Input } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
} from '../firebase';

interface RegisterScreenProps {
	navigation: any;
}

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
	const [name, setName] = React.useState<string>();
	const [email, setEmail] = React.useState<string>();
	const [password, setPassword] = React.useState<string>();
	const [url, setUrl] = React.useState<string>();

	const handleRegister = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				updateProfile(auth.currentUser, {
					displayName: name,
					photoURL: url,
				});
			})
			.catch((error) => {
				const errorMessage = error.message;
				alert(errorMessage);
			});
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='light' />

			<Text style={styles.title}>Create a Signal account</Text>

			<View style={styles.inputContainer}>
				<Input
					placeholder='Full Name'
					autoFocus
					value={name}
					onChangeText={(text) => setName(text)}
				/>

				<Input
					placeholder='Email'
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>

				<Input
					placeholder='Password'
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
				<Input
					placeholder='Profile picture url(optional)'
					value={url}
					onChangeText={(text) => setUrl(text)}
					onSubmitEditing={handleRegister}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={handleRegister}
				title='Register'
			/>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: 'white',
		textAlign: 'center',
		margin: 'auto',
	},

	inputContainer: {
		width: 300,
	},

	title: {
		fontSize: 25,
		fontWeight: '700',
		marginBottom: 50,
	},
	button: { width: 200, marginTop: 10 },
});
