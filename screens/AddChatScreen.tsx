import { Button, Icon, Input } from '@rneui/base';
import { addDoc, collection } from 'firebase/firestore';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { db } from '../firebase';

interface AddChatScreenProps {
	navigation: any;
}

const AddChatScreen = ({ navigation }: AddChatScreenProps) => {
	const [input, setInput] = useState<string>();

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add new chat',
			headerBackTitle: 'Chats',
		});
	}, [navigation]);

	const createChat = async () => {
		await addDoc(collection(db, 'chats'), {
			chatName: input,
		})
			.then(() => navigation.goBack())
			.catch((error) => alert(error.message));
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder='Chat name'
				autoFocus
				value={input}
				onChangeText={(text) => setInput(text)}
				onSubmitEditing={createChat}
				leftIcon={
					<Icon name='wechat' type='antdesign' size={24} color={'black'} />
				}
			/>

			<Button onPress={createChat} title={'Create new Chat'} />
		</View>
	);
};

export default AddChatScreen;

const styles = StyleSheet.create({
	container: {},
});
