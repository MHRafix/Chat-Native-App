import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Avatar, Text } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { auth, db } from '../firebase';

interface ChatScreenProps {
	navigation: any;
	route: any;
}

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
	const [messages, onChangeMessages] = useState([]);
	const [input, setInput] = useState<string>();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: route?.params?.chat?.chatName,
			// headerBackTitleVisible: true,
			// headerBackTitle: 'true',
			headerStyle: {
				backgroundColor: '#fff',
			},
			headerTitleStyle: {
				fontSize: 17,
				color: 'black',
			},
			headerLeft: () => (
				<View
					style={{
						marginRight: 15,
					}}
				>
					<Avatar
						rounded
						size={'small'}
						containerStyle={{ backgroundColor: 'teal' }}
						source={{ uri: route?.params?.chat?.photoURL }}
					/>
				</View>
			),

			headerRight: () => (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-end',
						gap: 15,
						width: 180,
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<Ionicons name='videocam' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('AddChat')}
						activeOpacity={0.5}
					>
						<MaterialIcons name='call' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5}>
						<Entypo name='dots-three-vertical' size={24} color='black' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	useLayoutEffect(() => {
		let messages = [];
		const messagesQuery = query(
			collection(db, 'messages'),
			where('chatId', '==', route?.params?.id)
		);

		getDocs(messagesQuery)
			.then((res) => {
				res.docs.map((doc) => {
					messages.push({ ...doc.data(), id: doc.id });
				});
				onChangeMessages(messages);
			})
			.catch((err) => alert(err.message));
	}, [route]);

	// send message
	const handleSendMessage = async () => {
		Keyboard.dismiss();
		await addDoc(collection(db, 'messages'), {
			timestamp: new Date(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
			chatId: route?.params?.id,
		})
			.then(() => setInput(''))
			.catch((error) => alert(error.message));
		onChangeMessages([
			...messages,
			{
				timestamp: new Date(),
				message: input,
				displayName: auth.currentUser.displayName,
				email: auth.currentUser.email,
				photoURL: auth.currentUser.photoURL,
				chatId: route?.params?.id,
			},
		]);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar style='dark' />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
				keyboardVerticalOffset={90}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView
							contentContainerStyle={{
								paddingTop: 10,
							}}
						>
							{messages?.map((data, idx: number) =>
								data.email === auth.currentUser.email ? (
									<View key={idx} style={styles.receiver}>
										<Avatar
											containerStyle={{
												position: 'absolute',
												bottom: -10,
												right: -5,
											}}
											size={25}
											rounded
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text style={styles.receiverText}>{data?.message}</Text>
									</View>
								) : (
									<View key={idx} style={styles.sender}>
										<Avatar
											containerStyle={{
												position: 'absolute',
												bottom: -10,
												left: 5,
											}}
											size={25}
											rounded
											source={{
												uri: data.photoURL,
											}}
										/>
										<Text style={styles.senderText}>{data?.message}</Text>
									</View>
								)
							)}
						</ScrollView>
						<View style={styles.footer}>
							<TextInput
								value={input}
								onSubmitEditing={handleSendMessage}
								onChangeText={(text) => setInput(text)}
								placeholder='Type message...'
								style={styles.textInput}
							/>

							<TouchableOpacity
								disabled={!input}
								onPress={handleSendMessage}
								activeOpacity={0.5}
							>
								<Ionicons name='send' size={24} color={'#2B68E6'} />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: { flex: 1 },
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		borderColor: 'transparent',
		backgroundColor: '#ECECEC',
		borderWidth: 1,
		padding: 10,
		color: 'grey',
		borderRadius: 30,
	},

	receiver: {
		padding: 15,
		backgroundColor: '#ECECEC',
		alignSelf: 'flex-end',
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: '80%',
		position: 'relative',
	},
	sender: {
		padding: 15,
		backgroundColor: '#2B68E6',
		alignSelf: 'flex-start',
		borderRadius: 20,
		marginRight: 15,
		marginBottom: 20,
		maxWidth: '80%',
		position: 'relative',
	},
	receiverText: {},
	senderText: {
		color: '#FFFFFF',
	},
});
