import { Button, Input } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { auth } from '../firebase';

interface LoginScreenProps {
	navigation: any;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
	const [email, setEmail] = React.useState<string>();
	const [password, setPassword] = React.useState<string>();

	useEffect(() => {
		return onAuthStateChanged(auth, (authUser) => {
			console.log(authUser);
			if (authUser) {
				navigation.replace('Home');
			}
		});
	}, []);

	const handleSignIn = () => {
		signInWithEmailAndPassword(auth, email, password).catch((error) => {
			const errorMessage = error.message;
			alert(errorMessage);
		});
	};
	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>
			<StatusBar style='auto' />

			<Image
				source={{
					uri: 'https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Messages-512.png',
				}}
				style={{ width: 200, height: 200 }}
			/>

			<View style={styles.inputContainer}>
				<Input
					placeholder='Email'
					autoFocus
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>

				<Input
					placeholder='Password'
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
					onSubmitEditing={handleSignIn}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				onPress={handleSignIn}
				title='Login'
			/>
			<Button
				onPress={() => navigation.navigate('Register')}
				containerStyle={styles.button}
				type='outline'
				title='Register'
			/>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

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
	button: { width: 200, marginTop: 10 },
});
