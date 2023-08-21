// import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { Avatar } from '@rneui/base';
import { signOut } from 'firebase/auth';
import React, { useLayoutEffect, useState } from 'react';

import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import ChatCardListItem from '../components/Custom/Home/ChatCardListItem';
import { auth, db } from '../firebase';

interface HomeScreenProps {
	navigation: any;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
	const [chats, onChangeChats] = useState<any>();

	const signOutUser = () => {
		signOut(auth).then(() => {
			navigation.replace('Login');
		});
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: auth?.currentUser?.displayName.split(' ')[0],
			headerStyle: {
				backgroundColor: '#fff',
			},
			headerTitleStyle: {
				color: 'black',
			},
			headerLeft: () => (
				<View
					style={{
						marginRight: 15,
					}}
				>
					<TouchableOpacity onPress={signOutUser}>
						<Avatar
							rounded
							size={'small'}
							source={{ uri: auth?.currentUser?.photoURL }}
						/>
					</TouchableOpacity>
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
						<AntDesign name='camerao' size={24} color='black' />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate('AddChat')}
						activeOpacity={0.5}
					>
						<SimpleLineIcons name='pencil' size={24} color='black' />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	useLayoutEffect(() => {
		let chats = [];
		getDocs(collection(db, 'chats'))
			.then((res) => {
				res.docs.map((doc, idx) => {
					chats.push({ ...doc.data(), id: doc.id });
				});
				onChangeChats(chats);
			})
			.catch((err) => alert(err.message));
	}, [navigation]);

	const enterChat = (id: string, chat: any) => {
		navigation.navigate('Chat', {
			id,
			chat,
		});
	};
	return (
		<SafeAreaView>
			<ScrollView style={styles.container}>
				{chats?.map((chat: any, idx: number) => (
					<ChatCardListItem chat={chat} key={idx} enterChat={enterChat} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
	},
});
